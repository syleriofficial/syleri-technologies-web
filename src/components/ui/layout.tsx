import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[76rem] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/**
 * A page section with a consistent vertical rhythm. Pass `id` for anchor
 * links and `labelledBy` to tie the region to its heading. Sections are
 * separated by a hairline rule, never by background colour.
 */
export function Section({
  children,
  className = "",
  id,
  labelledBy,
  rule = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  /** Draw the hairline above the section. */
  rule?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-20 py-16 sm:py-24 ${rule ? "border-t border-line" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * The section index: a short monospace label in the left column of every
 * numbered section ("03  Not included"). It is the site's one recurring
 * structural device.
 */
export function SectionIndex({ index, children, className = "" }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`type-label ${className}`}>
      {index ? (
        <>
          <span className="text-accent">{index}</span>
          <span aria-hidden="true">&ensp;</span>
        </>
      ) : null}
      {children}
    </p>
  );
}

/**
 * A numbered section: index label in the left three columns, content in the
 * right nine. `title` becomes the section's h2; pass `hideTitle` when the
 * label already says it all (the h2 then stays for screen readers).
 * `wide` content spans the full container below the two columns.
 */
export function IndexedSection({
  id,
  index,
  label,
  title,
  hideTitle = false,
  intro,
  children,
  wide,
  rule = true,
  className = "",
}: {
  id: string;
  index: string;
  label: string;
  title?: ReactNode;
  hideTitle?: boolean;
  intro?: ReactNode;
  children?: ReactNode;
  wide?: ReactNode;
  /** Draw the hairline above the section (off directly under the figure band). */
  rule?: boolean;
  className?: string;
}) {
  const headingId = `${id}-title`;
  return (
    <Section id={id} labelledBy={headingId} rule={rule} className={className}>
      <Container>
        <div className="grid gap-y-5 lg:grid-cols-12 lg:gap-x-8">
          <SectionIndex index={index} className="lg:col-span-3 lg:pt-3">
            {label}
          </SectionIndex>
          <div className="min-w-0 lg:col-span-9">
            <h2 id={headingId} className={hideTitle ? "sr-only" : "type-h2 max-w-[30ch]"}>
              {title ?? label}
            </h2>
            {intro ? <div className="mt-5 max-w-[62ch] leading-relaxed text-ink-soft">{intro}</div> : null}
            {children}
          </div>
        </div>
        {wide}
      </Container>
    </Section>
  );
}

/** Facts row: a ruled strip of label/value pairs in mono. Replaces cards and badges. */
export function FactsRow({ items, className = "" }: { items: { label: string; value: ReactNode }[]; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 border-t border-line md:grid-cols-4 md:border-b ${className}`}>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`border-b border-line py-4 md:border-b-0 md:py-[1.125rem] ${i % 2 === 1 ? "pl-4" : ""} ${
            i > 0 ? "md:border-l md:pl-5" : ""
          } ${i % 2 === 1 ? "border-l md:border-l" : ""}`}
        >
          <dt className="type-label text-[0.75rem]">{item.label}</dt>
          <dd className="mt-1 font-mono text-[0.875rem] text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A two-column ruled row: a short title and its sentence. Stacks on small screens. */
export function RuledRow({ title, children, as: Tag = "h3" }: { title: ReactNode; children: ReactNode; as?: "h3" | "dt" }) {
  return (
    <div className="grid gap-2 border-b border-line py-6 md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] md:gap-8">
      <Tag className="type-h3">{title}</Tag>
      <div className="leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

/** Plain section heading (h2 or h3) with an optional intro, for unnumbered sections. */
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
      {intro ? <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p> : null}
    </div>
  );
}
