export const SOURCE_SYSTEM = {
  Website: 365000001,
  API: 365000002,
  Partner: 365000003,
} as const;

export const CRM_STATUS = {
  Pending: 365000000,
  LeadCreated: 365000001,
  ContactCreated: 365000002,
  Error: 365000003,
} as const;

export const CONSENT_METHOD = {
  WebForm: 365000000,
  Checkbox: 365000001,
  Verbal: 365000002,
} as const;

export const PROJECT_TYPE: Record<string, number> = {
  "Mobile App Development": 365000000,
  "Web Development": 365000001,
  "AI Automation": 365000002,
  "Dynamics 365 / Power Platform": 365000003,
  Cybersecurity: 365000004,
  Other: 365000005,
} as const;

export function resolveProjectType(value?: string | null): number | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return PROJECT_TYPE[trimmed];
}
