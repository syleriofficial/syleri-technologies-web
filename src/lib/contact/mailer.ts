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

class ContactMailerConfigError extends Error {}
class ContactMailerSendError extends Error {}

function readRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new ContactMailerConfigError(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

function buildEmailBody({ name, email, subject, message }: ContactSubmission): string {
  return [
    `New message from the Syleri Technologies contact form.`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    ``,
    `Message:`,
    message,
  ].join("\n");
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
        subject: `[Contact] ${submission.subject}`,
        text: buildEmailBody(submission),
      }),
      signal: controller.signal,
    });
  } catch (err) {
    throw new ContactMailerSendError(`Contact mailer request failed: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new ContactMailerSendError(`Contact mailer responded with ${response.status}: ${body.slice(0, 500)}`);
  }
}
