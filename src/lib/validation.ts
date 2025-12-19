/**
 * Zod validation schemas (TypeScript port from legacy project)
 */
import { z } from "zod";

function isValidUs10OrE164Phone(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;

  // E.164 (international): +[country][number], 10-15 digits total after +
  if (/^\+[1-9]\d{9,14}$/.test(trimmed)) return true;

  // US 10-digit (allow separators)
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length === 10) return true;

  // Also allow US country code without leading '+' (e.g., 18556403636)
  if (digitsOnly.length === 11 && digitsOnly.startsWith("1")) return true;

  return false;
}

export const contactSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters")
      .regex(/^[a-zA-Z\s\-']+$/, "First name contains invalid characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters")
      .regex(/^[a-zA-Z\s\-']+$/, "Last name contains invalid characters"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .max(255, "Email is too long"),
    phone: z.preprocess(
      (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
      z
        .string()
        .refine(
          isValidUs10OrE164Phone,
          "Phone number must be US 10-digit or E.164 format"
        )
        .optional()
    ),

    company: z
      .string()
      .optional()
      .refine((val) => !val || val.length <= 100, "Company name is too long"),
    projectType: z.enum([
      "Web Development",
      "Mobile App Development",
      "Cloud Solutions",
      "AI Integration",
      "Digital Transformation",
      "E-commerce Platform",
      "Custom Software",
      "Other",
    ]),
    budget: z
      .enum([
        "Under $10,000",
        "$10,000 - $25,000",
        "$25,000 - $50,000",
        "$50,000 - $100,000",
        "Over $100,000",
        "Not sure yet",
      ])
      .optional(),
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(2000, "Message must be less than 2000 characters"),
    newsletter: z.boolean().default(false),
    smsOptIn: z.boolean().default(false),
    honeypot: z
      .string()
      .optional()
      .refine((val) => !val, "Bot detected"),
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.smsOptIn && (!data.phone || !data.phone.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Phone number is required when opting in to SMS messages",
      });
      return;
    }

    if (data.smsOptIn && data.phone && !isValidUs10OrE164Phone(data.phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Phone number must be US 10-digit or E.164 format",
      });
    }
  });
export type ContactFormData = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address").max(255),
  firstName: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 2 && val.length <= 50),
      "First name must be 2-50 characters"
    )
    .refine(
      (val) => !val || /^[a-zA-Z\s\-']+$/.test(val),
      "First name contains invalid characters"
    ),
  lastName: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 2 && val.length <= 50),
      "Last name must be 2-50 characters"
    )
    .refine(
      (val) => !val || /^[a-zA-Z\s\-']+$/.test(val),
      "Last name contains invalid characters"
    ),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
  doubleOptIn: z.boolean().default(true),
});
export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Blog Post Validation
export const blogPostCreateSchema = z.object({
  title: z.string().min(3).max(140),
  slug: z
    .string()
    .min(3)
    .max(160)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  content: z.string().min(20),
  excerpt: z.string().max(300).optional(),
  coverImage: z.string().url().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().max(160).optional(),
  seoDescription: z.string().max(200).optional(),
  authorId: z.string().cuid(),
});

export const blogPostUpdateSchema = blogPostCreateSchema
  .partial()
  .extend({ id: z.string().cuid() });

export type BlogPostCreateInput = z.infer<typeof blogPostCreateSchema>;
export type BlogPostUpdateInput = z.infer<typeof blogPostUpdateSchema>;
