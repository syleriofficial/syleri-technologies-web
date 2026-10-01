import Link from "next/link";
import { type Product, statusLabel } from "@/content/products";

/**
 * The product ledger — Syleri's catalog. Every product is a row with the
 * same four facts. It grows by data alone as new products ship.
 */
export function ProductLedger({
  items,
  headingId,
  heading = "Product index",
  showFootnote = true,
}: {
  items: Product[];
  headingId: string;
  heading?: string;
  showFootnote?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line bg-raised">
      <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3.5 sm:px-6">
        <h2 id={headingId} className="text-[0.9375rem] font-[620] text-ink">
          {heading}
        </h2>
        <span className="text-[0.875rem] tabular-nums text-muted">
          {items.length} {items.length === 1 ? "product" : "products"}
        </span>
      </div>

      <div className="ledger-row hidden border-b border-line px-6 py-2.5 text-[0.8125rem] text-muted md:grid" aria-hidden="true">
        <span>Product</span>
        <span>Category</span>
        <span>Version</span>
        <span>Status</span>
      </div>

      <ul>
        {items.map((p) => (
          <li key={p.slug} className="border-b border-line last:border-b-0">
            <Link
              href={p.href}
              className="ledger-row group px-5 py-4 transition-colors hover:bg-surface sm:px-6"
            >
              <span className="min-w-0">
                <span className="block text-[1.0625rem] font-[620] tracking-[-0.01em] text-ink group-hover:text-accent">
                  {p.name}
                </span>
                <span className="block text-[0.9375rem] text-muted">{p.subtitle}</span>
              </span>
              <span className="text-[0.9375rem] text-ink-soft">
                <span className="text-muted md:hidden">Category: </span>
                {p.category}
              </span>
              <span className="text-[0.9375rem] text-ink-soft">
                <span className="text-muted md:hidden">Version: </span>
                {p.version}
              </span>
              <span className="text-[0.9375rem]">
                <span className="text-muted md:hidden">Status: </span>
                <StatusMark status={p.status} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {showFootnote ? (
        <p className="border-t border-dashed border-line px-5 py-3.5 text-[0.875rem] text-muted sm:px-6">
          New products are added to this index when they are released.
        </p>
      ) : null}
    </div>
  );
}

export function StatusMark({ status }: { status: Product["status"] }) {
  return (
    <span className="inline-flex items-center gap-2 text-ink-soft">
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${status === "available" ? "bg-accent" : "border border-line-strong"}`}
      />
      {statusLabel[status]}
    </span>
  );
}
