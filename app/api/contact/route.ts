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

export const runtime = "nodejs";

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
  const userAgent = req.headers.get("user-agent");
  const ip = req.ip;

  const smsOptIn = !!validatedData.smsOptIn;
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

  const insertResult = await collection.insertOne({
    ...contactData,
    smsOptIn,
    leadScore,
    leadNotes,
    createdAt: new Date(),
    status: "NEW",
  });

  try {
    await emailService.sendContactNotification(contactData);
  } catch {}

  return NextResponse.json(
    {
      success: true,
      message: "Thank you for your message.",
      contactId: insertResult.insertedId.toString(),
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
