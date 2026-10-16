import type { ReactNode } from "react";

/**
 * Notices carry real information (configuration status, product
 * limitations). They are never decorative.
 */
export function Notice({
  title,
  children,
  tone = "info",
  className = "",
  role,
}: {
  title: string;
  children: ReactNode;
  tone?: "info" | "config";
  className?: string;
  role?: "note" | "status";
}) {
  const toneCls =
    tone === "config"
      ? "border-notice-line bg-notice text-notice-ink"
      : "border-line-strong bg-raised text-ink-soft";
  return (
    <div role={role ?? "note"} className={`rounded-md border px-5 py-4 ${toneCls} ${className}`}>
      <p className="font-semibold text-current">{title}</p>
      <div className="mt-1 text-[0.9375rem] leading-relaxed">{children}</div>
    </div>
  );
}
