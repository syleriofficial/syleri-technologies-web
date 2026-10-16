import Link from "next/link";
import { categoryName, productPath, type Product } from "@/content/products";
import { Figure } from "./figure";
import { StatusMark } from "./product-ledger";
import { ArrowLink, ButtonLink } from "./ui/button-link";

/** Whether a product can be bought right now. */
export function isPurchasable(p: Product) {
  return p.status === "available" && !!p.checkoutUrl && !!p.price;
}

/** Version / status / price facts for any product, in mono, on a ruled line. */
export function ProductFacts({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <dl className={`flex flex-wrap gap-x-8 gap-y-3 ${className}`}>
      <div>
        <dt className="type-label text-[0.75rem]">Version</dt>
        <dd className="mt-1 font-mono text-[0.9375rem] text-ink">{product.version}</dd>
      </div>
      <div>
        <dt className="type-label text-[0.75rem]">Status</dt>
        <dd className="mt-1 text-[0.9375rem]">
          <StatusMark status={product.status} />
        </dd>
      </div>
      {product.price ? (
        <div>
          <dt className="type-label text-[0.75rem]">Price</dt>
          <dd className="mt-1 font-mono text-[0.9375rem] text-ink">{product.price.label}</dd>
        </div>
      ) : null}
    </dl>
  );
}

/**
 * Product actions on /products: the purchase button when the product is on
 * sale, then the product page and the demo as text links.
 */
export function ProductActions({ product }: { product: Product }) {
  const sr = <span className="sr-only">: {product.name}</span>;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      {isPurchasable(product) ? (
        <ButtonLink href={product.checkoutUrl!} size="lg">
          Get {product.name} — ${product.price!.amount}
        </ButtonLink>
      ) : null}
      <ArrowLink href={productPath(product)}>
        View product{sr}
      </ArrowLink>
      {product.demoUrl ? (
        <ArrowLink href={product.demoUrl} newTab>
          Live demo{sr}
        </ArrowLink>
      ) : null}
    </div>
  );
}

function ProductHeader({ product, as: Heading }: { product: Product; as: "h2" | "h3" }) {
  return (
    <>
      <p className="type-label">
        {categoryName(product.category)}
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        {product.kind}
      </p>
      <Heading className="mt-3 text-[2.25rem] font-semibold leading-none tracking-[-0.035em] sm:text-[2.75rem]">
        <Link href={productPath(product)} className="hover:text-accent">
          {product.name}
        </Link>
      </Heading>
      <p className="mt-3 text-lg font-medium leading-snug tracking-[-0.01em] text-ink-soft">{product.subtitle}</p>
    </>
  );
}

/**
 * Featured product entry on /products: facts and actions on the left, a real
 * screenshot on the right. Ruled, not boxed.
 */
export function ProductFeature({
  product,
  headingLevel = "h3",
  priority = false,
}: {
  product: Product;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}) {
  return (
    <article className="grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-x-8">
      <div className="lg:col-span-5">
        <ProductHeader product={product} as={headingLevel} />
        <p className="mt-5 max-w-[56ch] leading-relaxed text-ink-soft">{product.summary}</p>
        <ProductFacts product={product} className="mt-7 border-y border-line py-4" />
        <div className="mt-8">
          <ProductActions product={product} />
        </div>
      </div>
      {product.cover ? (
        <Figure
          className="lg:col-span-7"
          caption={product.cover.brief}
          media={product.cover}
          eager={priority}
          sizes="(min-width: 1216px) 670px, (min-width: 1024px) 56vw, calc(100vw - 4rem)"
        />
      ) : null}
    </article>
  );
}

/** Compact product row for /products listings. Scales to many products per category. */
export function ProductRow({ product, headingLevel = "h3" }: { product: Product; headingLevel?: "h3" | "h4" }) {
  const Heading = headingLevel;
  return (
    <article className="grid gap-5 py-7 lg:grid-cols-[minmax(0,1fr)_15rem_auto] lg:items-center lg:gap-10">
      <div className="min-w-0">
        <p className="type-label">{product.kind}</p>
        <Heading className="mt-1 text-[1.25rem] font-semibold tracking-[-0.018em]">
          <Link href={productPath(product)} className="hover:text-accent">
            {product.name}
          </Link>
        </Heading>
        <p className="mt-0.5 font-medium text-ink-soft">{product.subtitle}</p>
        <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted">{product.summary}</p>
      </div>
      <ProductFacts product={product} />
      <div className="lg:flex lg:justify-end">
        <ProductActions product={product} />
      </div>
    </article>
  );
}
