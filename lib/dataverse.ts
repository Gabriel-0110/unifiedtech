/// <reference types="node" />

function normalizeBaseUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

function getRequiredEnv() {
  const dataverseUrl = process.env.DATAVERSE_URL;
  // Prefer AZURE_* for Dataverse (current naming), but support legacy MS_* vars
  // since earlier iterations of the project used MS_* for Microsoft identity.
  const tenantId = process.env.AZURE_TENANT_ID || process.env.MS_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID || process.env.MS_CLIENT_ID;
  const clientSecret =
    process.env.AZURE_CLIENT_SECRET || process.env.MS_CLIENT_SECRET;

  const missing: string[] = [];
  if (!dataverseUrl) missing.push("DATAVERSE_URL");
  if (!tenantId) missing.push("AZURE_TENANT_ID (or MS_TENANT_ID)");
  if (!clientId) missing.push("AZURE_CLIENT_ID (or MS_CLIENT_ID)");
  if (!clientSecret) missing.push("AZURE_CLIENT_SECRET (or MS_CLIENT_SECRET)");

  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  return {
    dataverseUrl: normalizeBaseUrl(dataverseUrl!),
    tenantId: tenantId!,
    clientId: clientId!,
    clientSecret: clientSecret!,
  };
}

function normalizeDataversePath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return trimmed;
  return trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;
}

function truncateForErrorBody(body: string, max = 2000): string {
  if (!body) return "";
  if (body.length <= max) return body;
  return `${body.slice(0, max)}…`;
}

export type DataverseFetchHeaders = {
  /** https://org.api.crm.dynamics.com/api/data/v9.2/entityset(guid) */
  odataEntityId?: string;
};

export async function getDataverseAccessToken(): Promise<string> {
  const { dataverseUrl, tenantId, clientId, clientSecret } = getRequiredEnv();

  const tokenUrl = `https://login.microsoftonline.com/${encodeURIComponent(
    tenantId
  )}/oauth2/v2.0/token`;

  const scope = `${dataverseUrl}/.default`;

  const body = new URLSearchParams();
  body.set("client_id", clientId);
  body.set("client_secret", clientSecret);
  body.set("grant_type", "client_credentials");
  body.set("scope", scope);

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Dataverse token request failed: ${res.status} ${
        res.statusText
      } - ${truncateForErrorBody(text)}`
    );
  }

  let json: unknown;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      `Dataverse token response parse failed: ${res.status} ${
        res.statusText
      } - ${truncateForErrorBody(text)}`
    );
  }

  const accessToken = (json as any)?.access_token;
  if (typeof accessToken !== "string" || !accessToken) {
    throw new Error(
      `Dataverse token response missing access_token (status ${res.status})`
    );
  }

  // Never log this token.
  return accessToken;
}

export async function dataverseFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<{ status: number; data: T; headers: DataverseFetchHeaders }> {
  const { dataverseUrl } = getRequiredEnv();
  const token = await getDataverseAccessToken();

  const normalizedPath = normalizeDataversePath(path);
  const url = `${dataverseUrl}/api/data/v9.2/${normalizedPath}`;

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Accept", "application/json");
  headers.set("OData-Version", "4.0");
  headers.set("OData-MaxVersion", "4.0");

  const res = await fetch(url, {
    ...init,
    headers,
  });

  const responseHeaders: DataverseFetchHeaders = {
    odataEntityId: res.headers.get("OData-EntityId") ?? undefined,
  };

  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Dataverse request failed: ${res.status} ${
        res.statusText
      } - ${truncateForErrorBody(text)}`
    );
  }

  if (!text) {
    return {
      status: res.status,
      data: undefined as unknown as T,
      headers: responseHeaders,
    };
  }

  try {
    const data = JSON.parse(text) as T;
    return { status: res.status, data, headers: responseHeaders };
  } catch {
    throw new Error(
      `Dataverse response parse failed: ${res.status} ${
        res.statusText
      } - ${truncateForErrorBody(text)}`
    );
  }
}

export function parseGuidFromODataEntityId(entityId: string): string {
  const input = (entityId || "").trim();
  if (!input) throw new Error("OData-EntityId is empty");

  const match = input.match(/\(([^)]+)\)/);
  if (!match?.[1]) throw new Error("Invalid OData-EntityId format");

  const inner = match[1].trim();
  const decoded = inner.includes("%") ? safeDecodeURIComponent(inner) : inner;
  const withoutBraces = decoded.replace(/[{}]/g, "");

  // Basic sanity check (GUID-like). Keep permissive to avoid false negatives.
  if (!/^[0-9a-fA-F-]{32,36}$/.test(withoutBraces)) {
    throw new Error("Failed to parse GUID from OData-EntityId");
  }
  return withoutBraces;
}

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getWebSubmissionEntitySetName(): string {
  const raw = process.env.DATAVERSE_WEB_SUBMISSION_ENTITYSET;
  return raw && raw.trim() ? raw.trim() : "ux_websubmissions";
}

export async function createWebSubmission(
  payload: Record<string, unknown>
): Promise<{ id: string }> {
  const entitySet = getWebSubmissionEntitySetName();

  const result = await dataverseFetch<unknown>(entitySet, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload ?? {}),
  });

  const entityId = result.headers.odataEntityId;
  if (!entityId) {
    throw new Error(
      "Dataverse createWebSubmission did not return OData-EntityId header"
    );
  }

  return { id: parseGuidFromODataEntityId(entityId) };
}

export async function updateWebSubmission(
  id: string,
  payload: Record<string, unknown>
): Promise<void> {
  const entitySet = getWebSubmissionEntitySetName();
  const trimmedId = (id || "").trim();
  if (!trimmedId) throw new Error("updateWebSubmission requires id");

  await dataverseFetch<unknown>(`${entitySet}(${trimmedId})`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "If-Match": "*",
    },
    body: JSON.stringify(payload ?? {}),
  });
}

export async function createLead(
  payload: Record<string, unknown>
): Promise<{ id: string }> {
  const result = await dataverseFetch<unknown>("leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload ?? {}),
  });

  const entityId = result.headers.odataEntityId;
  if (!entityId) {
    throw new Error(
      "Dataverse createLead did not return OData-EntityId header"
    );
  }

  return { id: parseGuidFromODataEntityId(entityId) };
}
