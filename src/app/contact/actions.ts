"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";
import { checkRateLimit } from "@/lib/contact/rate-limit";
import { sendContactEmail } from "@/lib/contact/mailer";
import type { ContactFormState } from "@/lib/contact/types";
import { validateContactSubmission } from "@/lib/contact/validate";

/**
 * Server Action backing the contact form (src/components/contact-form.tsx).
 * Runs only on the server: the destination mailbox and mail-service API key
 * (read inside sendContactEmail) never reach the client bundle, HTML,
 * metadata or JSON-LD — only the ContactFormState returned below does, and
 * it carries nothing but a generic status message and field-level
 * validation errors.
 */

const SUCCESS_MESSAGE = "Thanks — your message has been sent. We'll get back to you by email.";
const GENERIC_ERROR_MESSAGE = "Something went wrong sending your message. Please try again in a moment.";
const EXPIRED_MESSAGE = "Your session expired before the message could be sent. Please reload the page and try again.";
const RATE_LIMITED_MESSAGE = "Too many messages sent recently. Please try again in a few minutes.";
const DISABLED_MESSAGE = "The contact form is not available at the moment.";

// A genuine visitor always takes at least this long to fill the form; a
// script submitting immediately on page load does not. Paired with the
// honeypot field, this is a lightweight, dependency-free spam filter.
const MIN_FILL_TIME_MS = 1500;
// Reject a stale form render (e.g. a page left open for hours, or a replayed
// request) rather than accept it indefinitely.
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;

const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5);
const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MINUTES ?? 10) * 60_000;

async function getClientKey(): Promise<string> {
  const hdrs = await headers();
  const forwardedFor = hdrs.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || "unknown";
  return `contact:${ip}`;
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
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const renderedAtRaw = formData.get("formRenderedAt");
  const renderedAt = typeof renderedAtRaw === "string" ? Number(renderedAtRaw) : NaN;
  const elapsed = Date.now() - renderedAt;
  if (!Number.isFinite(renderedAt) || elapsed < MIN_FILL_TIME_MS || elapsed > MAX_FORM_AGE_MS) {
    return { status: "error", message: EXPIRED_MESSAGE };
  }

  const clientKey = await getClientKey();
  const rateLimit = checkRateLimit(clientKey, { max: RATE_LIMIT_MAX, windowMs: RATE_LIMIT_WINDOW_MS });
  if (!rateLimit.allowed) {
    return { status: "error", message: RATE_LIMITED_MESSAGE };
  }

  const validation = validateContactSubmission(formData);
  if (!validation.ok) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: validation.fieldErrors };
  }

  try {
    await sendContactEmail(validation.data);
  } catch (err) {
    // Full detail goes to server logs only; the visitor gets a generic
    // message with no information about the mail service or its config.
    console.error("[contact] failed to send message:", err);
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
