"use client";
import React, { useState } from "react";
import Link from "next/link";

function isValidUs10OrE164Phone(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;
  if (/^\+[1-9]\d{9,14}$/.test(trimmed)) return true;

  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length === 10) return true;
  if (digitsOnly.length === 11 && digitsOnly.startsWith("1")) return true;
  return false;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
  smsOptIn: boolean;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
    smsOptIn: false,
  });

  function getPhoneError(
    nextPhone: string,
    nextSmsOptIn: boolean
  ): string | null {
    const trimmed = nextPhone.trim();

    if (nextSmsOptIn && !trimmed) {
      return "Phone number is required for SMS opt-in.";
    }

    if (trimmed && !isValidUs10OrE164Phone(trimmed)) {
      return "Please enter a valid phone number (US 10-digit or E.164 format, e.g. +18556403636).";
    }

    return null;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    const next: FormState = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    } as FormState;

    if (name === "phone" || name === "smsOptIn") {
      setPhoneError(getPhoneError(next.phone, next.smsOptIn));
    }

    setFormData(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextPhoneError = getPhoneError(formData.phone, formData.smsOptIn);
    if (nextPhoneError) {
      setPhoneError(nextPhoneError);
      setStatus({ type: "error", message: nextPhoneError });
      return;
    }

    setPhoneError(null);
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Build payload WITHOUT budget (you don't have a budget field)
      const payload: any = {
        ...formData,
        newsletter: false,
      };

      // Omit phone entirely if blank (prevents schema treating "" as "provided")
      const phoneTrimmed = (payload.phone ?? "").toString().trim();
      if (!phoneTrimmed) {
        delete payload.phone;
      } else {
        payload.phone = phoneTrimmed;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type") || "";
        let message = "Submission failed";

        try {
          if (contentType.includes("application/json")) {
            const data: any = await res.json();
            // Prefer server-provided, user-friendly message.
            // Our API validation middleware returns `{ error, code, details }`.
            // `details` is often a Zod issues array.
            if (Array.isArray(data?.details) && data.details.length > 0) {
              const firstIssue = data.details[0];
              const issueMsg = firstIssue?.message;
              const issuePath = Array.isArray(firstIssue?.path)
                ? firstIssue.path.join(".")
                : "";
              message = issueMsg
                ? issuePath
                  ? `${issueMsg} (${issuePath})`
                  : issueMsg
                : message;
            } else {
              const base =
                data?.message ||
                data?.error ||
                (data ? JSON.stringify(data) : "");
              message = base || message;
            }
            if (data?.code) message = `${message} (${data.code})`;
            if (data?.reason) message = `${message}: ${data.reason}`;
          } else {
            const text = await res.text();
            if (text) message = text;
          }
        } catch {
          // Fall back to a generic message
        }

        throw new Error(message);
      }

      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        message: "",
        smsOptIn: false,
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.message || "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white p-8 dark:bg-gray-900 lg:p-12">
      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Let&apos;s Start Your Project
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Fill out the form below and we&apos;ll get back to you within 24
          hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name *
            </label>
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name *
            </label>
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address *
            </label>
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number{formData.smsOptIn ? " *" : ""}
            </label>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+18556403636"
              required={formData.smsOptIn}
              aria-required={formData.smsOptIn}
              aria-invalid={!!phoneError}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
            {phoneError ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {phoneError}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Company
          </label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Type *
          </label>
          <select
            required
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="">Select a project type</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="Cloud Solutions">Cloud Solutions</option>
            <option value="AI Integration">AI Integration</option>
            <option value="Digital Transformation">
              Digital Transformation
            </option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Details *
          </label>
          <textarea
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="smsOptIn"
                name="smsOptIn"
                checked={formData.smsOptIn}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <div className="flex-1">
                <label
                  htmlFor="smsOptIn"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  By checking this box and submitting this form at{" "}
                  <Link
                    href="https://ggunifiedtech.com/contact"
                    className="underline hover:no-underline"
                  >
                    https://ggunifiedtech.com/contact
                  </Link>
                  , you consent to receive service-related, 1-to-1 SMS from
                  UnifiedTech Solutions by G&G at the number provided
                  (appointment reminders, account notifications, and support
                  follow-ups). Msg frequency varies. Msg &amp; data rates may
                  apply. Consent is not a condition of purchase. Reply STOP to
                  opt out, HELP for help. Privacy Policy:{" "}
                  <Link
                    href="https://ggunifiedtech.com/privacy"
                    className="underline hover:no-underline"
                  >
                    https://ggunifiedtech.com/privacy
                  </Link>{" "}
                  Terms:{" "}
                  <Link
                    href="https://ggunifiedtech.com/terms"
                    className="underline hover:no-underline"
                  >
                    https://ggunifiedtech.com/terms
                  </Link>
                  . mobile opt-in information won&apos;t be shared with third
                  parties for marketing purposes.
                </label>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  If you opt in to SMS, a mobile number is required. Otherwise,
                  you can submit this form without a phone number.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Sending Message..." : "Send Message"}
        </button>

        {status && (
          <p
            className={`text-sm ${
              status.type === "success"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
