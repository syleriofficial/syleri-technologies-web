import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium tracking-[-0.005em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary: "border border-line-strong bg-raised text-ink hover:border-ink",
  quiet: "text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-[0.9375rem]",
  lg: "h-12 px-[1.375rem] text-base",
};

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Open external links in a new tab (demo links). Checkout stays in the same tab. */
  newTab?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/**
 * Link styled as a button. Internal links use next/link; external links get
 * safe rel attributes and, when opening a new tab, an accessible hint.
 */
export function ButtonLink({ href, children, variant = "primary", size = "md", className = "", newTab, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${variant === "quiet" ? "" : sizes[size]} ${className}`;
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={cls}
        rel={newTab ? "noopener noreferrer" : "noopener"}
        target={newTab ? "_blank" : undefined}
        {...rest}
      >
        {children}
        {newTab ? (
          <>
            <ExternalIcon />
            <span className="sr-only">(opens in a new tab)</span>
          </>
        ) : null}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/** Inline text link with the same external-link handling. */
export function TextLink({
  href,
  children,
  className = "",
  newTab,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  newTab?: boolean;
}) {
  const cls = `text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent ${className}`;
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={cls}
        rel={newTab ? "noopener noreferrer" : "noopener"}
        target={newTab ? "_blank" : undefined}
      >
        {children}
        {newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/**
 * A secondary action written as a sentence with an arrow ("Open the live
 * demo →"). Sits beside a primary button instead of a second boxed button.
 */
export function ArrowLink({
  href,
  children,
  className = "",
  newTab,
  tone = "ink",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  newTab?: boolean;
  tone?: "ink" | "accent";
}) {
  const color = tone === "accent" ? "text-accent hover:text-accent-hover" : "text-ink hover:text-accent";
  const cls = `group inline-flex items-baseline gap-1.5 font-medium transition-colors ${color} ${className}`;
  const arrow = (
    <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
      {newTab ? "↗" : "→"}
    </span>
  );
  if (isExternal(href)) {
    return (
      <a href={href} className={cls} rel={newTab ? "noopener noreferrer" : "noopener"} target={newTab ? "_blank" : undefined}>
        {children}
        {arrow}
        {newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}

export function ExternalIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M6 3.5H3.5v9h9V10M9 3.5h3.5V7M12.5 3.5 7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
