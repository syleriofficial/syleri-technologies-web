import { JsonLd } from "@/components/json-ld";
import { ProductFeature } from "@/components/product-feature";
import { ProductLedger } from "@/components/product-ledger";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { categoryDescriptions, products } from "@/content/products";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Software products and developer tools from Syleri Technologies, including Stockline, a POS and inventory management dashboard for Next.js.",
  path: "/products",
});

export default function ProductsPage() {
  const categories = Array.from(new Set(products.map((p) => p.category)));

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
          <h1 id="products-title" className="type-title max-w-[18ch]">
            Products
          </h1>
          <p className="type-lead mt-5 max-w-[52ch]">
            Every Syleri Technologies product, with its category, current version and availability. The catalog grows as
            new products are released.
          </p>
          <div className="mt-12">
            <ProductLedger items={products} headingId="directory-title" heading="Directory" showFootnote={false} />
          </div>
        </Container>
      </section>

      {categories.map((category) => {
        const inCategory = products.filter((p) => p.category === category);
        const id = `cat-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        return (
          <Section key={category} labelledBy={id}>
            <Container>
              <SectionHeading
                id={id}
                title={category}
                intro={categoryDescriptions[category]}
              />
              <div className="mt-10 space-y-8">
                {inCategory.map((p) => (
                  <ProductFeature
                    key={p.slug}
                    product={p}
                    shot={p.slug === "stockline" ? "dashboard" : undefined}
                    primaryLabel="View product"
                    showFacts
                  />
                ))}
              </div>
            </Container>
          </Section>
        );
      })}
    </>
  );
}
