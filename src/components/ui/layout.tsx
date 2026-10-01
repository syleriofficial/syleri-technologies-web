import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[76rem] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/**
 * A page section with a consistent vertical rhythm. Pass `id` for anchor
 * links and `labelledBy` to tie the region to its heading.
 */
export function Section({
  children,
  className = "",
  id,
  labelledBy,
  tone = "base",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  tone?: "base" | "surface";
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-16 sm:py-24 ${tone === "surface" ? "bg-surface" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Section heading block. The left rule marks the start of a new section
 * in the reading flow; it is the only structural ornament the site uses.
 */
export function SectionHeading({
  id,
  title,
  intro,
  as: Tag = "h2",
  className = "",
}: {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={`max-w-[44rem] ${className}`}>
      <Tag id={id} className={Tag === "h2" ? "type-h2" : "type-h3"}>
        {title}
      </Tag>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p> : null}
    </div>
  );
}
