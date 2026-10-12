/** Shared types for the contact form. No secrets live here. */

export type ContactFields = "name" | "email" | "subject" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  /** Human-readable status message. Safe to render; never contains secrets. */
  message?: string;
  /** Per-field validation errors, keyed by field name. */
  fieldErrors?: Partial<Record<ContactFields, string>>;
  /**
   * The visitor's own input, echoed back on error so the form can be
   * refilled (React resets uncontrolled forms after every action). Never
   * contains anything but what the visitor typed.
   */
  values?: Partial<Record<ContactFields, string>>;
};

export type ContactSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
