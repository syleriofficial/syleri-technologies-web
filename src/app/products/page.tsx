import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProductFeature, ProductRow } from "@/components/product-feature";
import { ProductLedger } from "@/components/product-ledger";
import { Container, SectionIndex } from "@/components/ui/layout";
import { products, productsByCategory } from "@/content/products";
import { updates } from "@/content/updates";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Products",
  description: "Software, platforms and technology products from Syleri Technologies, with category, version and availability for each.",
  path: "/products",
});

/** The compact index table appears once the catalog is large enough to need an overview. */
const INDEX_THRESHOLD = 3;

export default function ProductsPage() {
  const groups = productsByCategory();
  const latest = updates.find((u) => u.kind === "release");
  const showIndex = products.length >= INDEX_THRESHOLD;
  // Category headings only help once there is more than one category.
  const showCategories = groups.length > 1;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />

      <section aria-labelledby="products-title">
        <Container className="pb-12 pt-14 sm:pb-16 sm:pt-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
            <div className="lg:col-span-8">
              <h1 id="products-title" className="type-title">
                Products
              </h1>
              <p className="type-lead mt-5 max-w-[46ch]">
                Every Syleri Technologies product, with its version, availability and price. New products are added here
                when they are released.
              </p>
            </div>
            {latest ? (
              <dl className="lg:col-span-4 lg:justify-self-end">
                <dt className="type-label text-[0.75rem]">Latest release</dt>
                <dd className="mt-1">
                  <Link href={`/updates/${latest.slug}`} className="font-mono text-[0.9375rem] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                    {latest.title}
                  </Link>
                  {latest.date ? <span className="type-label"> · {latest.date}</span> : null}
                </dd>
              </dl>
            ) : null}
          </div>

          {showCategories ? (
            <nav aria-label="Product categories" className="mt-10">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {groups.map(({ category, items }) => (
                  <li key={category.id}>
                    <a href={`#${category.id}`} className="text-[0.9375rem] text-ink-soft hover:text-accent">
                      {category.name} <span className="font-mono text-[0.8125rem] text-muted">{items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {showIndex ? <ProductLedger className="mt-12 hidden md:block" items={products} /> : null}
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
          <section key={category.id} id={category.id} aria-labelledby={headingId} className="scroll-mt-20 pb-20 sm:pb-28">
            <Container>
              {showCategories ? (
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                  <div>
                    <SectionIndex index={String(gi + 1).padStart(2, "0")}>{category.name}</SectionIndex>
                    <h2 id={headingId} className="type-h2 mt-3">
                      {category.name}
                    </h2>
                    <p className="mt-3 max-w-[60ch] text-ink-soft">{category.description}</p>
                  </div>
                </div>
              ) : (
                <h2 id={headingId} className="sr-only">
                  {category.name}
                </h2>
              )}

              {featured.length ? (
                <div className="space-y-16">
                  {featured.map((p, i) => (
                    <ProductFeature key={p.slug} product={p} priority={gi === 0 && i === 0} />
                  ))}
                </div>
              ) : null}

              {rest.length ? (
                <ul className={`border-t border-line ${featured.length ? "mt-16" : ""}`}>
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
