import "server-only";
import type { ContactSubmission } from "./types";

/**
 * Sends the contact form to the destination mailbox via Resend's HTTP API.
 *
 * Security: everything in this file runs on the server only. `import
 * "server-only"` makes the build fail if a client component ever imports
 * this module. The destination address and API key are read from
 * environment variables and are never passed to the client, embedded in
 * HTML/JSON-LD, or returned in the server action's response — only a
 * generic success/error message crosses that boundary.
 *
 * Required environment variables (set in Vercel project settings, not
 * committed to the repo — see .env.example):
 *   RESEND_API_KEY    Resend API key (server-side mail service credential).
 *   CONTACT_TO_EMAIL  Destination mailbox for submissions.
 *   CONTACT_FROM_EMAIL  Verified "from" address on the Resend account/domain.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const REQUEST_TIMEOUT_MS = 10_000;

class ContactMailerConfigError extends Error {
  name = "ContactMailerConfigError";
}
class ContactMailerSendError extends Error {
  name = "ContactMailerSendError";
}

function readRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new ContactMailerConfigError(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

const EMAIL_SUBJECT_PREFIX = "Syleri Technologies Contact — ";

function formatTimestamp(date: Date): string {
  // e.g. "2026-10-12 14:46 UTC" — unambiguous regardless of reader's timezone.
  return `${date.toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildTextBody({ name, email, subject, message }: ContactSubmission, submittedAt: string): string {
  return [
    "New message from the Syleri Technologies contact form.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    message,
  ].join("\n");
}

function buildHtmlBody({ name, email, subject, message }: ContactSubmission, submittedAt: string): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#5b6472;vertical-align:top;white-space:nowrap">${label}</td>` +
    `<td style="padding:4px 0;color:#111827">${escapeHtml(value)}</td></tr>`;
  return [
    `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#111827;max-width:640px">`,
    `<p style="margin:0 0 16px">New message from the Syleri Technologies contact form.</p>`,
    `<table role="presentation" style="border-collapse:collapse;margin:0 0 20px">`,
    row("Name", name),
    row("Email", email),
    row("Subject", subject),
    row("Submitted", submittedAt),
    `</table>`,
    `<div style="border-top:1px solid #e5e7eb;padding-top:16px;white-space:pre-wrap">${escapeHtml(message)}</div>`,
    `</div>`,
  ].join("");
}

/**
 * Sends the submission. Throws on any failure (missing config, network
 * error, non-2xx response) — callers must catch this and show the visitor
 * a generic error without leaking details.
 */
export async function sendContactEmail(submission: ContactSubmission): Promise<void> {
  const apiKey = readRequiredEnv("RESEND_API_KEY");
  const to = readRequiredEnv("CONTACT_TO_EMAIL");
  const from = readRequiredEnv("CONTACT_FROM_EMAIL");

  const submittedAt = formatTimestamp(new Date());
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.email,
        subject: `${EMAIL_SUBJECT_PREFIX}${submission.subject}`,
        text: buildTextBody(submission, submittedAt),
        html: buildHtmlBody(submission, submittedAt),
      }),
      signal: controller.signal,
    });
  } catch (err) {
    const reason = err instanceof Error && err.name === "AbortError" ? "timed out" : "network error";
    throw new ContactMailerSendError(`Contact mailer request failed (${reason})`);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    // Log only the HTTP status and Resend's machine-readable error name
    // (e.g. "validation_error"). The response message is deliberately
    // dropped: provider messages can echo email addresses, which must not
    // end up in logs.
    const errorName = await response
      .json()
      .then((b: unknown) => (b && typeof b === "object" && "name" in b && typeof b.name === "string" ? b.name : "unknown"))
      .catch(() => "unknown");
    throw new ContactMailerSendError(`Contact mailer responded with ${response.status} (${errorName.slice(0, 60)})`);
  }
}
