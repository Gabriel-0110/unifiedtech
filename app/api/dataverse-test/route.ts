/**
 * Temporary smoke test endpoint.
 * Requires env vars: DATAVERSE_URL, AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET.
 * Calls Dataverse WhoAmI to verify auth/permissions.
 */
import { NextResponse } from "next/server";
import { dataverseFetch } from "../../../lib/dataverse";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const debugToken = req.headers.get("x-debug-token") || "";
  const allowed =
    process.env.NODE_ENV === "development" ||
    (!!process.env.DEBUG_API_TOKEN &&
      debugToken === process.env.DEBUG_API_TOKEN);

  // In production, do not expose this probe endpoint without an explicit token.
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Not found" },
      { status: 404 }
    );
  }

  try {
    const { data } = await dataverseFetch<Record<string, unknown>>("WhoAmI");
    return NextResponse.json({ ok: true, whoAmI: data });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    return NextResponse.json(
      { ok: false, error: { message: error.message, name: error.name } },
      { status: 500 }
    );
  }
}
