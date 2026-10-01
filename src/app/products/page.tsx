import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProductFeature, ProductRow } from "@/components/product-feature";
import { ProductLedger } from "@/components/product-ledger";
import { Container } from "@/components/ui/layout";
import { products, productsByCategory } from "@/content/products";
import { updates } from "@/content/updates";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Products",
  description: "Software products and developer tools from Syleri Technologies, with category, version and availability for each.",
  path: "/products",
});

/** The compact index table appears once the catalog is large enough to need an overview. */
const INDEX_THRESHOLD = 3;

export default function ProductsPage() {
  const groups = productsByCategory();
  const latest = updates.find((u) => u.kind === "release");
  const showIndex = products.length >= INDEX_THRESHOLD;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />

      <section aria-labelledby="products-title" className="border-b border-line">
        <Container className="pb-14 pt-14 sm:pb-20 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
            <div>
              <h1 id="products-title" className="type-title">
                Products
              </h1>
              <p className="type-lead mt-5 max-w-[50ch]">
                Every Syleri Technologies product, with its category, current version and availability. The catalog grows
                as new products are released.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-5 text-[0.9375rem] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {showIndex ? (
                <>
                  <div>
                    <dt className="text-muted">Products</dt>
                    <dd className="mt-0.5 text-[1.75rem] font-[650] tabular-nums leading-tight tracking-[-0.02em]">{products.length}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Categories</dt>
                    <dd className="mt-0.5 text-[1.75rem] font-[650] tabular-nums leading-tight tracking-[-0.02em]">{groups.length}</dd>
                  </div>
                </>
              ) : null}
              {latest ? (
                <div className="col-span-2">
                  <dt className="text-muted">Latest release</dt>
                  <dd className="mt-0.5">
                    <Link href={`/updates/${latest.slug}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                      {latest.title}
                    </Link>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          {groups.length > 1 ? (
            <nav aria-label="Product categories" className="mt-10">
              <ul className="flex flex-wrap gap-2">
                {groups.map(({ category, items }) => (
                  <li key={category.id}>
                    <a
                      href={`#${category.id}`}
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-line px-3 text-[0.9375rem] text-ink-soft hover:border-line-strong hover:text-ink"
                    >
                      {category.name}
                      <span className="tabular-nums text-muted">{items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {showIndex ? (
            <div className="mt-12 hidden md:block">
              <ProductLedger items={products} headingId="directory-title" heading="Directory" footnote={null} />
            </div>
          ) : null}
        </Container>
      </section>

      {groups.length === 0 ? (
        <Container className="py-20">
          <p className="type-lead">No products are listed yet.</p>
        </Container>
      ) : null}

      {groups.map(({ category, items }, gi) => {
        const featured = items.filter((p) => p.featured);
        const rest = items.filter((p) => !p.featured);
        const headingId = `${category.id}-title`;
        return (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={headingId}
            className={`scroll-mt-20 py-16 sm:py-24 ${gi % 2 === 1 ? "bg-surface" : ""}`}
          >
            <Container>
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                <div className="max-w-[44rem]">
                  <h2 id={headingId} className="type-h2">
                    {category.name}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{category.description}</p>
                </div>
                {items.length > 1 ? <p className="text-[0.9375rem] tabular-nums text-muted">{items.length} products</p> : null}
              </div>

              {featured.length ? (
                <div className="mt-10 space-y-8">
                  {featured.map((p, i) => (
                    <ProductFeature key={p.slug} product={p} primaryLabel="View product" showFacts priority={gi === 0 && i === 0} />
                  ))}
                </div>
              ) : null}

              {rest.length ? (
                <ul className={`border-t border-line ${featured.length ? "mt-12" : "mt-10"}`}>
                  {rest.map((p) => (
                    <li key={p.slug} className="border-b border-line">
                      <ProductRow product={p} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </Container>
          </section>
        );
      })}
    </>
  );
}
