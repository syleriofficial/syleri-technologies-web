"use client";

import { useId, useRef, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/contact/actions";
import type { ContactFields, ContactFormState } from "@/lib/contact/types";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "w-full rounded-[0.625rem] border bg-raised px-3.5 py-2.5 text-[0.9375rem] text-ink placeholder:text-muted disabled:opacity-60";

function fieldBorder(hasError: boolean) {
  return hasError ? "border-notice-line" : "border-line";
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[0.625rem] bg-accent px-5 text-base font-[560] tracking-[-0.01em] text-on-accent transition-colors duration-150 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-3 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  autoComplete,
}: {
  label: string;
  name: ContactFields;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block text-[0.9375rem] font-[560] text-ink">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-1.5 ${inputClass} ${fieldBorder(Boolean(error))}`}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-[0.875rem] text-notice-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function MessageField({ error }: { error?: string }) {
  const id = "contact-message";
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block text-[0.9375rem] font-[560] text-ink">
        Message
      </label>
      <textarea
        id={id}
        name="message"
        required
        rows={6}
        minLength={10}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-1.5 resize-y ${inputClass} ${fieldBorder(Boolean(error))}`}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-[0.875rem] text-notice-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [renderedAt] = useState(() => Date.now());
  const honeypotId = useId();
  const fieldErrors = state.fieldErrors ?? {};
  const hasFieldErrors = Object.keys(fieldErrors).length > 0;

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-xl border border-line-strong bg-raised px-5 py-4 text-ink-soft">
        <p className="font-[620] text-ink">Message sent</p>
        <p className="mt-1 text-[0.9375rem] leading-relaxed">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={(formData) => {
        formData.set("formRenderedAt", String(renderedAt));
        return formAction(formData);
      }}
      noValidate
      className="space-y-5"
    >
      <div aria-live="polite">
        {state.status === "error" && state.message && !hasFieldErrors ? (
          <p role="alert" className="rounded-xl border border-notice-line bg-notice px-5 py-4 text-[0.9375rem] text-notice-ink">
            {state.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from sighted users and screen readers alike. Real
          visitors never populate this; anything that does is automated. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={honeypotId}>Leave this field empty</label>
        <input id={honeypotId} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Name" name="name" error={fieldErrors.name} autoComplete="name" />
      <Field label="Email" name="email" type="email" error={fieldErrors.email} autoComplete="email" />
      <Field label="Subject" name="subject" error={fieldErrors.subject} autoComplete="off" />
      <MessageField error={fieldErrors.message} />

      <SubmitButton />
    </form>
  );
}
