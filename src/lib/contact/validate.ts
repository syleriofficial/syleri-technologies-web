import type { ContactFields, ContactSubmission } from "./types";

/**
 * Server-side validation for the contact form. Pure and dependency-free so
 * it can run in the server action and be unit-tested directly. Never trust
 * the client: this is the real gate, not a UX nicety.
 */

const LIMITS = {
  name: { min: 1, max: 120 },
  email: { min: 3, max: 254 },
  subject: { min: 1, max: 150 },
  message: { min: 10, max: 5000 },
} as const;

// Deliberately simple (not a full RFC 5322 parser) — good enough to catch
// typos and junk without rejecting real addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Reject control characters (including CR/LF) in single-line fields so a
// submitted value can never inject extra header-like lines into the
// outgoing email.
const CONTROL_CHARS = /[\r\n\t\x00-\x08\x0b\x0c\x0e-\x1f]/;

export type ValidationResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; fieldErrors: Partial<Record<ContactFields, string>> };

function readField(formData: FormData, field: ContactFields): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactSubmission(formData: FormData): ValidationResult {
  const fieldErrors: Partial<Record<ContactFields, string>> = {};

  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const subject = readField(formData, "subject");
  // Message is allowed to contain newlines; only the single-line fields are
  // checked for control characters.
  const messageRaw = formData.get("message");
  const message = typeof messageRaw === "string" ? messageRaw.trim() : "";

  if (!name) fieldErrors.name = "Enter your name.";
  else if (name.length > LIMITS.name.max) fieldErrors.name = `Name must be ${LIMITS.name.max} characters or fewer.`;
  else if (CONTROL_CHARS.test(name)) fieldErrors.name = "Name contains characters that aren't allowed.";

  if (!email) fieldErrors.email = "Enter your email address.";
  else if (email.length > LIMITS.email.max) fieldErrors.email = "Email address is too long.";
  else if (CONTROL_CHARS.test(email) || !EMAIL_PATTERN.test(email)) fieldErrors.email = "Enter a valid email address.";

  if (!subject) fieldErrors.subject = "Enter a subject.";
  else if (subject.length > LIMITS.subject.max) fieldErrors.subject = `Subject must be ${LIMITS.subject.max} characters or fewer.`;
  else if (CONTROL_CHARS.test(subject)) fieldErrors.subject = "Subject contains characters that aren't allowed.";

  if (!message) fieldErrors.message = "Enter a message.";
  else if (message.length < LIMITS.message.min) fieldErrors.message = `Message must be at least ${LIMITS.message.min} characters.`;
  else if (message.length > LIMITS.message.max) fieldErrors.message = `Message must be ${LIMITS.message.max} characters or fewer.`;

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, data: { name, email, subject, message } };
}
