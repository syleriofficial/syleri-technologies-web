import Link from "next/link";
import { categoryName, productPath, type Product } from "@/content/products";
import { ProductImage } from "./product-image";
import { StatusMark } from "./product-ledger";
import { ButtonLink } from "./ui/button-link";

/** Version / status / price facts for any product. */
export function ProductFacts({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <dl className={`flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem] ${className}`}>
      <div>
        <dt className="text-[0.8125rem] text-muted">Version</dt>
        <dd className="mt-0.5 text-ink">{product.version}</dd>
      </div>
      <div>
        <dt className="text-[0.8125rem] text-muted">Status</dt>
        <dd className="mt-0.5">
          <StatusMark status={product.status} />
        </dd>
      </div>
      <div>
        <dt className="text-[0.8125rem] text-muted">Price</dt>
        <dd className="mt-0.5 text-ink">{product.price?.label ?? "—"}</dd>
      </div>
    </dl>
  );
}

export function ProductActions({ product, primaryLabel }: { product: Product; primaryLabel: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <ButtonLink href={productPath(product)}>
        {primaryLabel}
        <span className="sr-only">: {product.name}</span>
      </ButtonLink>
      {product.demoUrl ? (
        <ButtonLink href={product.demoUrl} variant="secondary" newTab>
          Live demo<span className="sr-only">: {product.name}</span>
        </ButtonLink>
      ) : null}
    </div>
  );
}

/**
 * Large product panel used for featured products. Works for any product;
 * the image column only appears when the record has a cover.
 */
export function ProductFeature({
  product,
  headingLevel = "h3",
  primaryLabel,
  showFacts = false,
  priority = false,
}: {
  product: Product;
  headingLevel?: "h2" | "h3";
  primaryLabel: string;
  showFacts?: boolean;
  priority?: boolean;
}) {
  const Heading = headingLevel;
  const hasCover = !!product.cover;
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-raised">
      <div className={hasCover ? "grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : ""}>
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <p className="text-[0.9375rem] text-muted">{categoryName(product.category)}</p>
          <Heading className="mt-2 text-[2rem] font-[680] leading-tight tracking-[-0.03em]">
            <Link href={productPath(product)} className="hover:text-accent">
              {product.name}
            </Link>
          </Heading>
          <p className="mt-1 text-lg font-[560] leading-snug tracking-[-0.01em] text-ink-soft">{product.subtitle}</p>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{product.summary}</p>

          {showFacts ? (
            <ProductFacts product={product} className="mt-6 border-y border-line py-4" />
          ) : (
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`${product.name} technology`}>
              {product.technology.map((t) => (
                <li key={t} className="rounded-md border border-line px-2 py-0.5 text-[0.8125rem] text-ink-soft">
                  {t}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 lg:mt-auto lg:pt-8">
            <ProductActions product={product} primaryLabel={primaryLabel} />
          </div>
        </div>
        {product.cover ? (
          <div className="border-t border-line bg-surface p-4 sm:p-6 lg:border-l lg:border-t-0">
            <ProductImage media={product.cover} priority={priority} sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
        ) : null}
      </div>
    </article>
  );
}

/** Compact product row for directory listings. Scales to many products per category. */
export function ProductRow({ product, headingLevel = "h3" }: { product: Product; headingLevel?: "h3" | "h4" }) {
  const Heading = headingLevel;
  return (
    <article className="grid gap-5 py-7 lg:grid-cols-[minmax(0,1fr)_18rem_17rem] lg:items-center lg:gap-10">
      <div className="min-w-0">
        <Heading className="text-[1.25rem] font-[650] tracking-[-0.018em]">
          <Link href={productPath(product)} className="hover:text-accent">
            {product.name}
          </Link>
        </Heading>
        <p className="mt-0.5 font-[540] text-ink-soft">{product.subtitle}</p>
        <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted">{product.summary}</p>
      </div>
      <ProductFacts product={product} />
      <div className="lg:flex lg:justify-end">
        <ProductActions product={product} primaryLabel="View product" />
      </div>
    </article>
  );
}
