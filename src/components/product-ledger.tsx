import Link from "next/link";
import { categoryName, productPath, type Product, statusLabel } from "@/content/products";

/**
 * The product index — a compact table of every product with the same four
 * facts. With `limit`, it shows the first N and links to the full directory,
 * so it stays tidy at 10+ products.
 */
export function ProductLedger({
  items,
  headingId,
  heading = "Product index",
  limit,
  footnote = "New products are added to this index when they are released.",
  compact = false,
}: {
  items: Product[];
  headingId: string;
  heading?: string;
  limit?: number;
  footnote?: string | null;
  /** Two columns (product, status) for narrow placements such as the home hero. */
  compact?: boolean;
}) {
  const row = compact ? "ledger-row-compact" : "ledger-row";
  const shown = limit ? items.slice(0, limit) : items;
  const hidden = items.length - shown.length;

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

      <div className={`${row} hidden border-b border-line px-6 py-2.5 text-[0.8125rem] text-muted md:grid`} aria-hidden="true">
        <span>Product</span>
        {compact ? null : <span>Category</span>}
        {compact ? null : <span>Version</span>}
        <span>Status</span>
      </div>

      {items.length === 0 ? (
        <p className="px-6 py-6 text-[0.9375rem] text-muted">No products are listed yet.</p>
      ) : (
        <ul>
          {shown.map((p) => (
            <li key={p.slug} className="border-b border-line last:border-b-0">
              <Link href={productPath(p)} className={`${row} group px-5 py-4 transition-colors hover:bg-surface sm:px-6`}>
                <span className="min-w-0">
                  <span className="block text-[1.0625rem] font-[620] tracking-[-0.01em] text-ink group-hover:text-accent">
                    {p.name}
                  </span>
                  <span className="block text-[0.9375rem] text-muted">{p.subtitle}</span>
                </span>
                {compact ? null : (
                  <>
                    <span className="text-[0.9375rem] text-ink-soft">
                      <span className="text-muted md:hidden">Category: </span>
                      {categoryName(p.category)}
                    </span>
                    <span className="text-[0.9375rem] text-ink-soft">
                      <span className="text-muted md:hidden">Version: </span>
                      {p.version}
                    </span>
                  </>
                )}
                <span className="text-[0.9375rem]">
                  <span className="text-muted md:hidden">Status: </span>
                  <StatusMark status={p.status} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {hidden > 0 ? (
        <Link
          href="/products"
          className="block border-t border-line px-5 py-3.5 text-[0.9375rem] font-[560] text-ink hover:bg-surface hover:text-accent sm:px-6"
        >
          View all {items.length} products
        </Link>
      ) : footnote ? (
        <p className="border-t border-dashed border-line px-5 py-3.5 text-[0.875rem] text-muted sm:px-6">{footnote}</p>
      ) : null}
    </div>
  );
}

export function StatusMark({ status }: { status: Product["status"] }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-ink-soft">
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${status === "available" ? "bg-accent" : "border border-line-strong"}`}
      />
      {statusLabel[status]}
    </span>
  );
}
