"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";
import { clientIpFromHeaders, positiveIntSetting } from "@/lib/contact/client-ip";
import { checkRateLimit } from "@/lib/contact/rate-limit";
import { sendContactEmail } from "@/lib/contact/mailer";
import { HONEYPOT_FIELD_NAME, type ContactFields, type ContactFormState } from "@/lib/contact/types";
import { validateContactSubmission } from "@/lib/contact/validate";

/**
 * Server Action backing the contact form (src/components/contact-form.tsx).
 * Runs only on the server: the destination mailbox and mail-service API key
 * (read inside sendContactEmail) never reach the client bundle, HTML,
 * metadata or JSON-LD — only the ContactFormState returned below does, and
 * it carries nothing but a generic status message and field-level
 * validation errors.
 */

const SUCCESS_MESSAGE = "Thanks for contacting Syleri Technologies. We’ve received your message.";
const GENERIC_ERROR_MESSAGE = "We couldn’t send your message right now. Please try again later.";
const TOO_FAST_MESSAGE = "Please wait a moment, then send your message again.";
const EXPIRED_MESSAGE = "This form has expired. Please reload the page and try again.";
const RATE_LIMITED_MESSAGE = "Too many messages sent recently. Please try again in a few minutes.";
const DISABLED_MESSAGE = "The contact form is not available at the moment.";

// A genuine visitor always takes at least this long to fill the form; a
// script submitting immediately on page load does not. Paired with the
// honeypot field, this is a lightweight, dependency-free spam filter.
const MIN_FILL_TIME_MS = 1500;
// Reject a stale form render (e.g. a page left open for hours, or a replayed
// request) rather than accept it indefinitely.
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;

const RATE_LIMIT_MAX = positiveIntSetting(process.env.CONTACT_RATE_LIMIT_MAX, 5);
const RATE_LIMIT_WINDOW_MS = positiveIntSetting(process.env.CONTACT_RATE_LIMIT_WINDOW_MINUTES, 10) * 60_000;

const FIELDS: ContactFields[] = ["name", "email", "subject", "message"];

const MAX_ECHO_LENGTH = 5000;

/** The visitor's input, returned on error so the form keeps what they typed. */
function submittedValues(formData: FormData): ContactFormState["values"] {
  const values: ContactFormState["values"] = {};
  for (const field of FIELDS) {
    const v = formData.get(field);
    if (typeof v === "string") values[field] = v.slice(0, MAX_ECHO_LENGTH);
  }
  return values;
}

async function getClientKey(): Promise<string> {
  const hdrs = await headers();
  return `contact:${clientIpFromHeaders((name) => hdrs.get(name))}`;
}

export async function submitContactForm(_prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // The form is switched off (site.contact.formEnabled). Refuse direct
  // submissions too, so nothing is processed or sent until it is re-enabled.
  if (!site.contact.formEnabled) {
    return { status: "error", message: DISABLED_MESSAGE };
  }

  // Honeypot: real visitors never see or fill this field (it's visually
  // hidden and marked aria-hidden in the form). Anything that fills it is
  // automated. Report success without sending anything, so scripts don't
  // learn to avoid the trap.
  const honeypot = formData.get(HONEYPOT_FIELD_NAME);
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const renderedAtRaw = formData.get("formRenderedAt");
  const renderedAt = typeof renderedAtRaw === "string" ? Number(renderedAtRaw) : NaN;
  const elapsed = Date.now() - renderedAt;
  if (!Number.isFinite(renderedAt) || elapsed > MAX_FORM_AGE_MS) {
    return { status: "error", message: EXPIRED_MESSAGE, values: submittedValues(formData) };
  }
  if (elapsed < MIN_FILL_TIME_MS) {
    return { status: "error", message: TOO_FAST_MESSAGE, values: submittedValues(formData) };
  }

  const validation = validateContactSubmission(formData);
  if (!validation.ok) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: validation.fieldErrors, values: submittedValues(formData) };
  }

  // Rate-limit every submission that would send mail (5 per 10 minutes per
  // IP by default). Validation runs first so a visitor correcting typos
  // doesn't use up their allowance; invalid submissions never send anything.
  const clientKey = await getClientKey();
  const rateLimit = checkRateLimit(clientKey, { max: RATE_LIMIT_MAX, windowMs: RATE_LIMIT_WINDOW_MS });
  if (!rateLimit.allowed) {
    return { status: "error", message: RATE_LIMITED_MESSAGE, values: submittedValues(formData) };
  }

  try {
    await sendContactEmail(validation.data);
  } catch (err) {
    // Server logs get only the error class and a short summary (never
    // addresses, the API key or provider response bodies); the visitor gets
    // a generic message with no information about the mail service.
    const detail = err instanceof Error ? `${err.name}: ${err.message}` : "unknown error";
    console.error(`[contact] failed to send message — ${detail}`);
    return { status: "error", message: GENERIC_ERROR_MESSAGE, values: submittedValues(formData) };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
