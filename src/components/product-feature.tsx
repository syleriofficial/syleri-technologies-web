import Link from "next/link";
import { categoryName, productPath, type Product } from "@/content/products";
import { ProductImage } from "./product-image";
import { StatusMark } from "./product-ledger";
import { ButtonLink, TextLink } from "./ui/button-link";

/** Whether a product can be bought right now. */
export function isPurchasable(p: Product) {
  return p.status === "available" && !!p.checkoutUrl && !!p.price;
}

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
      {product.price ? (
        <div>
          <dt className="text-[0.8125rem] text-muted">Price</dt>
          <dd className="mt-0.5 text-ink">{product.price.label}</dd>
        </div>
      ) : null}
    </dl>
  );
}

/**
 * Card actions.
 * - "explore" (home page and company contexts): learn more + demo. Never a purchase button.
 * - "catalog" (/products): purchase when available, then product page, then demo as a text link.
 */
export function ProductActions({ product, mode }: { product: Product; mode: "explore" | "catalog" }) {
  const sr = <span className="sr-only">: {product.name}</span>;
  if (mode === "catalog" && isPurchasable(product)) {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
        <ButtonLink href={product.checkoutUrl!}>
          Get {product.name} — ${product.price!.amount}
        </ButtonLink>
        <ButtonLink href={productPath(product)} variant="secondary">
          View product{sr}
        </ButtonLink>
        {product.demoUrl ? (
          <p className="basis-full text-[0.9375rem] text-muted">
            Try it first:{" "}
            <TextLink href={product.demoUrl} newTab>
              live demo{sr}
            </TextLink>
          </p>
        ) : null}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-3">
      <ButtonLink href={productPath(product)}>
        {mode === "explore" ? `Explore ${product.name}` : "View product"}
        {mode === "explore" ? null : sr}
      </ButtonLink>
      {product.demoUrl ? (
        <ButtonLink href={product.demoUrl} variant="secondary" newTab>
          Live demo{sr}
        </ButtonLink>
      ) : null}
    </div>
  );
}

function ProductHeader({ product, as: Heading, size }: { product: Product; as: "h2" | "h3"; size: "lg" | "md" }) {
  return (
    <>
      <p className="text-[0.9375rem] text-muted">
        {categoryName(product.category)}
        <span aria-hidden="true" className="mx-2 text-line-strong">
          /
        </span>
        {product.kind}
      </p>
      <Heading
        className={
          size === "lg"
            ? "mt-2 text-[2rem] font-[680] leading-tight tracking-[-0.03em]"
            : "mt-1.5 text-[1.375rem] font-[650] leading-snug tracking-[-0.02em]"
        }
      >
        <Link href={productPath(product)} className="hover:text-accent">
          {product.name}
        </Link>
      </Heading>
      <p className={`mt-1 font-[560] leading-snug tracking-[-0.01em] text-ink-soft ${size === "lg" ? "text-lg" : ""}`}>
        {product.subtitle}
      </p>
    </>
  );
}

/**
 * Large product panel for featured products. Works for any product; the
 * image column only appears when the record has a cover.
 */
export function ProductFeature({
  product,
  headingLevel = "h3",
  mode,
  priority = false,
}: {
  product: Product;
  headingLevel?: "h2" | "h3";
  mode: "explore" | "catalog";
  priority?: boolean;
}) {
  const hasCover = !!product.cover;
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-raised">
      <div className={hasCover ? "grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : ""}>
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <ProductHeader product={product} as={headingLevel} size="lg" />
          <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{product.summary}</p>

          {mode === "catalog" ? (
            <ProductFacts product={product} className="mt-6 border-y border-line py-4" />
          ) : product.technology?.length ? (
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`${product.name} technology`}>
              {product.technology.map((t) => (
                <li key={t} className="rounded-md border border-line px-2 py-0.5 text-[0.8125rem] text-ink-soft">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 lg:mt-auto lg:pt-8">
            <ProductActions product={product} mode={mode} />
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

/** Compact product card for grids of secondary products (home page). */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-raised p-6 sm:p-7">
      <ProductHeader product={product} as="h3" size="md" />
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{product.summary}</p>
      <div className="mt-6 pt-2 md:mt-auto">
        <ProductActions product={product} mode="explore" />
      </div>
    </article>
  );
}

/** Compact product row for /products listings. Scales to many products per category. */
export function ProductRow({ product, headingLevel = "h3" }: { product: Product; headingLevel?: "h3" | "h4" }) {
  const Heading = headingLevel;
  return (
    <article className="grid gap-5 py-7 lg:grid-cols-[minmax(0,1fr)_15rem_24rem] lg:items-center lg:gap-10">
      <div className="min-w-0">
        <p className="text-[0.875rem] text-muted">{product.kind}</p>
        <Heading className="mt-0.5 text-[1.25rem] font-[650] tracking-[-0.018em]">
          <Link href={productPath(product)} className="hover:text-accent">
            {product.name}
          </Link>
        </Heading>
        <p className="mt-0.5 font-[540] text-ink-soft">{product.subtitle}</p>
        <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted">{product.summary}</p>
      </div>
      <ProductFacts product={product} />
      <div className="lg:flex lg:justify-end">
        <ProductActions product={product} mode="catalog" />
      </div>
    </article>
  );
}
