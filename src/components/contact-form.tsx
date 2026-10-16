"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/contact/actions";
import { HONEYPOT_FIELD_NAME, type ContactFields, type ContactFormState } from "@/lib/contact/types";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "w-full rounded-[0.625rem] border bg-bg px-3.5 py-2.5 text-[0.9375rem] text-ink placeholder:text-muted disabled:opacity-60";

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
      {pending ? (
        <>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none">
            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
            <path d="M17 10a7 7 0 0 0-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Sending…
        </>
      ) : (
        "Send message"
      )}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  autoComplete,
  maxLength,
  defaultValue,
}: {
  label: string;
  name: ContactFields;
  type?: string;
  error?: string;
  autoComplete?: string;
  maxLength?: number;
  defaultValue?: string;
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
        maxLength={maxLength}
        defaultValue={defaultValue}
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

function MessageField({ error, defaultValue }: { error?: string; defaultValue?: string }) {
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
        maxLength={5000}
        defaultValue={defaultValue}
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

const FIELD_ORDER: ContactFields[] = ["name", "email", "subject", "message"];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [renderedAt] = useState(() => Date.now());
  const honeypotId = useId();
  const fieldErrors = state.fieldErrors ?? {};
  const hasFieldErrors = Object.keys(fieldErrors).length > 0;
  const values = state.values ?? {};

  // After a submission, move focus somewhere useful: the success heading,
  // or the first field the server rejected.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
      return;
    }
    if (state.status === "error" && state.fieldErrors) {
      const first = FIELD_ORDER.find((f) => state.fieldErrors?.[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
    }
  }, [state]);

  return (
    // A single live region wraps both the form and the success message so
    // the change is announced by screen readers.
    <div aria-live="polite">
      {state.status === "success" ? (
        <div role="status" className="rounded-xl border border-line-strong bg-surface px-5 py-5 text-ink-soft">
          <h3 ref={successRef} tabIndex={-1} className="text-[1.0625rem] font-[620] text-ink focus:outline-none">
            Message sent
          </h3>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{state.message}</p>
        </div>
      ) : (
        <form
          ref={formRef}
          action={(formData) => {
            formData.set("formRenderedAt", String(renderedAt));
            return formAction(formData);
          }}
          noValidate
          aria-busy={isPending}
          className="space-y-5"
        >
          {state.status === "error" && state.message && !hasFieldErrors ? (
            <p role="alert" className="rounded-xl border border-notice-line bg-notice px-5 py-4 text-[0.9375rem] text-notice-ink">
              {state.message}
            </p>
          ) : null}

          {/* Honeypot: hidden from sighted users and screen readers alike. Real
              visitors never populate this; anything that does is automated. */}
          <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor={honeypotId}>Leave this field empty</label>
            <input
              id={honeypotId}
              name={HONEYPOT_FIELD_NAME}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              data-1p-ignore
              data-lpignore="true"
              data-bwignore
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" error={fieldErrors.name} autoComplete="name" maxLength={120} defaultValue={values.name} />
            <Field label="Email" name="email" type="email" error={fieldErrors.email} autoComplete="email" maxLength={254} defaultValue={values.email} />
          </div>
          <Field label="Subject" name="subject" error={fieldErrors.subject} autoComplete="off" maxLength={150} defaultValue={values.subject} />
          <MessageField error={fieldErrors.message} defaultValue={values.message} />

          <SubmitButton />
        </form>
      )}
    </div>
  );
}
