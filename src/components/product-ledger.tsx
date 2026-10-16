import Link from "next/link";
import { categoryName, productPath, type Product, statusLabel } from "@/content/products";

/**
 * The product index — a ruled table of every product with the same facts.
 * With `limit`, it shows the first N and links to the full directory, so it
 * stays tidy at 10+ products.
 */
export function ProductLedger({
  items,
  limit,
  compact = false,
  className = "",
}: {
  items: Product[];
  limit?: number;
  /** Product and status only, for narrow placements. */
  compact?: boolean;
  className?: string;
}) {
  const shown = limit ? items.slice(0, limit) : items;
  const hidden = items.length - shown.length;
  const cols = compact
    ? "md:grid-cols-[minmax(0,1fr)_8rem]"
    : "md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_6rem_8rem]";

  return (
    <div className={className}>
      <div className={`type-label hidden gap-6 border-b border-line pb-3 text-[0.75rem] md:grid ${cols}`} aria-hidden="true">
        <span>Product</span>
        {compact ? null : <span>Category</span>}
        {compact ? null : <span>Version</span>}
        <span>Status</span>
      </div>

      {items.length === 0 ? (
        <p className="border-y border-line py-6 text-[0.9375rem] text-muted">No products are listed yet.</p>
      ) : (
        <ul className="border-t border-line md:border-t-0">
          {shown.map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link href={productPath(p)} className={`group grid gap-1 py-4 md:items-baseline md:gap-6 ${cols}`}>
                <span className="min-w-0">
                  <span className="block text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink group-hover:text-accent">
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
                    <span className="font-mono text-[0.875rem] text-ink-soft">
                      <span className="font-sans text-muted md:hidden">Version: </span>
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
        <Link href="/products" className="mt-4 inline-block text-[0.9375rem] font-medium text-accent hover:text-accent-hover">
          View all {items.length} products →
        </Link>
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
