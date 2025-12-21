import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import {
  composeRoute,
  withSecurity,
  withLogging,
  withRateLimit,
  withValidation,
  withErrorBoundary,
  sanitizeInput,
} from "@/lib/middleware";
import { emailService } from "@/lib/email";
import { getMongoDb } from "@/lib/mongodb";
import {
  createLead,
  createWebSubmission,
  updateWebSubmission,
} from "@/lib/dataverse";
import {
  CONSENT_METHOD,
  CRM_STATUS,
  resolveProjectType,
  SOURCE_SYSTEM,
} from "@/lib/dataverseChoices";

export const runtime = "nodejs";

function buildSourceUrl(req: any, validatedData: any): string {
  const fromBody =
    typeof validatedData?.sourceUrl === "string" ? validatedData.sourceUrl : "";
  const candidate =
    fromBody ||
    req?.headers?.get?.("referer") ||
    req?.headers?.get?.("origin") ||
    req?.nextUrl?.origin ||
    "";
  return typeof candidate === "string" ? candidate.substring(0, 500) : "";
}

function looksLikeMissingColumnError(
  err: unknown,
  columnName: string
): boolean {
  const message = err instanceof Error ? err.message : String(err);
  const needle = columnName.toLowerCase();
  return (
    message.toLowerCase().includes("could not find a property") &&
    message.toLowerCase().includes(needle)
  );
}

function looksLikeInvalidPropertyError(
  err: unknown,
  propertyName: string
): boolean {
  const message = err instanceof Error ? err.message : String(err);
  const needle = propertyName.toLowerCase();
  const hay = message.toLowerCase();

  // Common Dataverse Web API messages:
  // - "Invalid property 'foo' was found in entity ..."
  // - "The property 'foo' does not exist on type ..."
  // - "could not find a property named 'foo' on type ..."
  // - "An undeclared property 'foo' which only has property annotations ..."
  return (
    (hay.includes("invalid property") ||
      hay.includes("does not exist on type") ||
      hay.includes("could not find a property") ||
      hay.includes("undeclared property")) &&
    hay.includes(needle)
  );
}

function getWebSubmissionLeadLookupNavPropertyCandidates(): string[] {
  // Allow overriding the navigation property/lookup logical name.
  // Example values you might set:
  // - ux_websubmission_Lead
  const raw = (process.env.DATAVERSE_WEB_SUBMISSION_LEAD_LOOKUP || "").trim();
  if (raw) return [raw];

  // Based on actual Dataverse metadata query:
  // NavigationProperty: ux_websubmission_Lead (capital L)
  // Try the correct one first, then fallback to lowercase variant.
  return ["ux_websubmission_Lead", "ux_websubmission_lead"];
}

function isValidUs10OrE164Phone(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;

  // E.164 like +18556403636
  if (/^\+[1-9]\d{9,14}$/.test(trimmed)) return true;

  // US 10-digit (or 11 with leading 1) in any formatting
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length === 10) return true;
  if (digitsOnly.length === 11 && digitsOnly.startsWith("1")) return true;

  return false;
}

function calculateLeadScore(data: any) {
  let score = 10;
  if (data.company) score += 15;
  if (data.phone) score += 10;
  if (data.budget) {
    switch (data.budget) {
      case "Over $100,000":
        score += 30;
        break;
      case "$50,000 - $100,000":
        score += 25;
        break;
      case "$25,000 - $50,000":
        score += 20;
        break;
      case "$10,000 - $25,000":
        score += 15;
        break;
      case "Under $10,000":
        score += 10;
        break;
      default:
        score += 5;
    }
  }
  if (data.message.length > 200) score += 10;
  if (data.message.length > 500) score += 5;
  if (data.newsletter) score += 5;
  return Math.min(score, 100);
}

const contactHandler = withErrorBoundary(async (req: any) => {
  let db;
  try {
    db = await getMongoDb();
    // Ensure the connection is actually usable
    await db.command({ ping: 1 });
  } catch (e: any) {
    return NextResponse.json(
      {
        error: "Database not available",
        code: "DB_UNAVAILABLE",
        ...(process.env.NODE_ENV === "development"
          ? { reason: e?.message || String(e) }
          : {}),
      },
      { status: 503 }
    );
  }

  const { validatedData } = req;
  const debugDataverse = req.headers.get("x-debug-dataverse") === "1";
  const debugToken = req.headers.get("x-debug-token") || "";
  const canExposeDebug =
    process.env.NODE_ENV === "development" ||
    (!!process.env.DEBUG_API_TOKEN &&
      debugToken === process.env.DEBUG_API_TOKEN);
  const userAgent = req.headers.get("user-agent");
  const ip = req.ip;

  // Consent rules:
  // - smsOptIn defaults false
  // - if smsOptIn === true, phone is required
  // - never infer smsOptIn from phone
  const smsOptIn = validatedData.smsOptIn === true;
  const rawPhone =
    typeof validatedData.phone === "string" ? validatedData.phone.trim() : "";

  // ✅ Phone is required ONLY if SMS opt-in is checked
  if (smsOptIn && !rawPhone) {
    return NextResponse.json(
      { success: false, message: "Phone number is required for SMS opt-in." },
      { status: 400 }
    );
  }

  // ✅ If phone is provided (whether opted in or not), validate basic format
  if (rawPhone && !isValidUs10OrE164Phone(rawPhone)) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please enter a valid phone number (US 10-digit or E.164 format, e.g. +18556403636).",
      },
      { status: 400 }
    );
  }

  const contactData = {
    firstName: sanitizeInput.string(validatedData.firstName),
    lastName: sanitizeInput.string(validatedData.lastName),
    email: sanitizeInput.email(validatedData.email),
    phone: rawPhone ? sanitizeInput.string(rawPhone) : null,
    company: validatedData.company
      ? sanitizeInput.string(validatedData.company)
      : null,
    projectType: validatedData.projectType,
    budget: validatedData.budget || null,
    message: sanitizeInput.string(validatedData.message, 2000),
    newsletter: validatedData.newsletter || false,
    source: validatedData.source || null,
    medium: validatedData.medium || null,
    campaign: validatedData.campaign || null,
    ipAddress: ip,
    userAgent: userAgent?.substring(0, 255) || null,
  };

  const leadNotes = smsOptIn
    ? `SMS consent: yes (service-only). Opt-in method: website contact form checkbox. Phone: ${
        contactData.phone || "N/A"
      }. STOP/HELP supported. Msg & data rates may apply. Consent is not a condition of purchase.`
    : "SMS consent: no.";

  const leadScore = calculateLeadScore(contactData);

  const collectionName =
    process.env.MONGODB_CONTACT_COLLECTION || "contact_submissions";
  const collection = db.collection(collectionName);

  const createdAt = new Date();

  const insertResult = await collection.insertOne({
    ...contactData,
    smsOptIn,
    leadScore,
    leadNotes,
    createdAt,
    status: "NEW",
  });

  const mongoId = insertResult.insertedId.toString();
  const sourceUrl = buildSourceUrl(req, validatedData);

  const dataverseResult: {
    webSubmissionId?: string;
    leadId?: string;
    status: "skipped" | "partial" | "ok" | "error";
  } = { status: "skipped" };
  let dataverseErrorMessage: string | undefined;

  // Dataverse integration (best-effort; Mongo insert is the source of truth).
  // If env vars aren't configured, createWebSubmission/createLead will throw.
  try {
    const projectTypeChoice = resolveProjectType(contactData.projectType);

    const webSubmissionPayloadBase: Record<string, unknown> = {
      // Dataverse Web API requires lowercase logical names, not schema names.
      ux_firstname: contactData.firstName,
      ux_lastname: contactData.lastName,
      ux_email: contactData.email,
      ...(contactData.phone ? { ux_phone: contactData.phone } : {}),
      ...(contactData.company ? { ux_company: contactData.company } : {}),
      ux_projectdetails: contactData.message,
      ...(typeof projectTypeChoice === "number"
        ? { ux_projecttype: projectTypeChoice }
        : {}),
      ux_smsoptin: smsOptIn,
      ...(smsOptIn ? { ux_smsoptintimestamp: createdAt.toISOString() } : {}),
      ux_consentmethod: CONSENT_METHOD.WebForm,
      ux_consentsourceurl: sourceUrl,
      ux_consentstatementversion: "v1",
      ux_sourcesystem: SOURCE_SYSTEM.Website,
      ux_sourceurl: sourceUrl,
      ux_submittedatutc: createdAt.toISOString(),
      ux_crmsyncstatus: CRM_STATUS.Pending,
      ...(contactData.source ? { ux_utmsource: contactData.source } : {}),
      ...(contactData.medium ? { ux_utmmedium: contactData.medium } : {}),
      ...(contactData.campaign ? { ux_utmcampaign: contactData.campaign } : {}),
    };

    // Include ux_mongoid if the column exists; otherwise omit (best-effort retry).
    const webSubmissionPayload: any = { ...webSubmissionPayloadBase };
    if (mongoId) webSubmissionPayload.ux_mongoid = mongoId;

    let webSubmissionId: string | undefined;
    try {
      const created = await createWebSubmission(webSubmissionPayload);
      webSubmissionId = created.id;
    } catch (err: unknown) {
      if (looksLikeMissingColumnError(err, "ux_mongoid")) {
        const retryPayload: Record<string, unknown> = {
          ...webSubmissionPayloadBase,
        };
        const created = await createWebSubmission(retryPayload);
        webSubmissionId = created.id;
      } else {
        throw err;
      }
    }

    dataverseResult.webSubmissionId = webSubmissionId;

    const descriptionParts = [
      `Project Type: ${contactData.projectType}`,
      "",
      "Message:",
      contactData.message,
      "",
      "Notes:",
      leadNotes,
    ];

    const leadPayload: Record<string, unknown> = {
      subject: `Website Contact - ${contactData.projectType}`,
      firstname: contactData.firstName,
      lastname: contactData.lastName,
      emailaddress1: contactData.email,
      ...(contactData.phone ? { mobilephone: contactData.phone } : {}),
      ...(contactData.company ? { companyname: contactData.company } : {}),
      description: descriptionParts.join("\n"),
      donotphone: !smsOptIn,
    };

    const createdLead = await createLead(leadPayload);
    dataverseResult.leadId = createdLead.id;

    // Update web submission record with CRM linkage.
    // Prefer the Lead lookup relationship (ux_websubmission_Lead) over a short text field.
    // Lookups are set using the navigation property with @odata.bind.
    const leadBindValue = `/leads(${createdLead.id})`;
    const navCandidates = getWebSubmissionLeadLookupNavPropertyCandidates();

    let updated = false;
    let lastUpdateErr: unknown;
    for (const nav of navCandidates) {
      try {
        await updateWebSubmission(webSubmissionId!, {
          ux_crmsyncstatus: CRM_STATUS.LeadCreated,
          [`${nav}@odata.bind`]: leadBindValue,
        });
        updated = true;
        break;
      } catch (e: unknown) {
        lastUpdateErr = e;
        if (looksLikeInvalidPropertyError(e, nav)) {
          continue;
        }
        throw e;
      }
    }

    // If none of the candidate nav property names worked, at least mark the submission
    // as LeadCreated so we don't fail the whole Dataverse sync.
    if (!updated) {
      await updateWebSubmission(webSubmissionId!, {
        ux_crmsyncstatus: CRM_STATUS.LeadCreated,
      });

      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.warn("[contact] Lead lookup bind failed; set status only", {
          webSubmissionId,
          leadId: createdLead.id,
          attemptedNavs: navCandidates,
          error:
            lastUpdateErr instanceof Error
              ? lastUpdateErr.message
              : String(lastUpdateErr),
        });
      }
    }

    dataverseResult.status = "ok";
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    dataverseErrorMessage = message;

    // Always log Dataverse failures in production so we can diagnose quickly.
    // Avoid logging secrets (tokens are never logged by the Dataverse client).
    // eslint-disable-next-line no-console
    console.error("[contact] Dataverse integration failed", {
      requestId: req.requestId,
      mongoId,
      webSubmissionId: dataverseResult.webSubmissionId,
      message,
    });

    // If we created a web submission, mark it as Error.
    if (dataverseResult.webSubmissionId) {
      try {
        await updateWebSubmission(dataverseResult.webSubmissionId, {
          ux_crmsyncstatus: CRM_STATUS.Error,
          ux_errormessage: message.substring(0, 2000),
        });
      } catch {}

      dataverseResult.status = "partial";
    } else {
      dataverseResult.status = "error";
    }
  }

  // Persist Dataverse sync outcome for later inspection (best-effort).
  // This helps diagnose production issues even when we don't expose error details to clients.
  try {
    await collection.updateOne(
      { _id: insertResult.insertedId },
      {
        $set: {
          dataverseSync: {
            status: dataverseResult.status,
            webSubmissionId: dataverseResult.webSubmissionId || null,
            leadId: dataverseResult.leadId || null,
            // Keep error text bounded.
            error: dataverseErrorMessage
              ? dataverseErrorMessage.substring(0, 2000)
              : null,
            requestId: req.requestId || null,
            updatedAt: new Date(),
          },
        },
      }
    );
  } catch {}

  try {
    await emailService.sendContactNotification(contactData);
  } catch {}

  return NextResponse.json(
    {
      ok: true,
      mongoId,
      dataverse: dataverseResult,
      requestId: req.requestId,
      ...((process.env.NODE_ENV === "development" ||
        (debugDataverse && canExposeDebug)) &&
      dataverseErrorMessage
        ? {
            dataverseError: dataverseErrorMessage.substring(0, 2000),
            nodeEnv: process.env.NODE_ENV,
          }
        : {}),
    },
    { status: 201 }
  );
});

const healthHandler = withErrorBoundary(async () =>
  NextResponse.json({ status: "healthy", endpoint: "contact" })
);

export const POST = composeRoute(
  withSecurity(),
  withLogging(),
  withRateLimit("contact"),
  withValidation(contactSchema),
  contactHandler
);

export const GET = composeRoute(withSecurity(), healthHandler);
