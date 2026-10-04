/** Shared types for the contact form. No secrets live here. */

export type ContactFields = "name" | "email" | "subject" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  /** Human-readable status message. Safe to render; never contains secrets. */
  message?: string;
  /** Per-field validation errors, keyed by field name. */
  fieldErrors?: Partial<Record<ContactFields, string>>;
};

export type ContactSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
