import { JsonLd } from "@/components/json-ld";
import { ProductLedger } from "@/components/product-ledger";
import { ArrowLink, TextLink } from "@/components/ui/button-link";
import { Container, IndexedSection, RuledRow } from "@/components/ui/layout";
import { focusAreas } from "@/content/catalog";
import { engineeringPrinciples } from "@/content/company";
import { getProduct, productPath, products, productsInArea } from "@/content/products";
import { formatDate, updates } from "@/content/updates";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Company",
  description:
    "Syleri Technologies is a technology company that builds software, platforms and technology products.",
  path: "/company",
});

export default function CompanyPage() {
  const firstRelease = [...updates].reverse().find((u) => u.kind === "release" && u.date && u.productSlug);
  const firstProduct = firstRelease?.productSlug ? getProduct(firstRelease.productSlug) : undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Company", path: "/company" },
        ])}
      />
      <section aria-labelledby="company-title">
        <Container className="pb-16 pt-14 sm:pb-24 sm:pt-20">
          <h1 id="company-title" className="type-title">
            Syleri Technologies
          </h1>
          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-x-8">
            <p className="type-lead lg:col-span-6">
              We build software, platforms and technology products, and release each one when it is ready to be relied
              on.
            </p>
            <p className="max-w-[52ch] leading-relaxed text-ink-soft lg:col-span-5 lg:col-start-8">
              {firstRelease && firstProduct ? (
                <>
                  Our first product, {firstProduct.name}, was released on{" "}
                  <time dateTime={firstRelease.date!}>{formatDate(firstRelease.date!)}</time>.
                </>
              ) : null}{" "}
              We would rather earn trust through each release than through claims about scale.
            </p>
          </div>
        </Container>
      </section>

      <IndexedSection id="work" index="01" label="What we work on" title="The areas we work in today.">
        <div className="mt-10 border-t border-line">
          {focusAreas.map((area) => {
            const inArea = productsInArea(area.id);
            return (
              <RuledRow key={area.id} title={area.title}>
                <p>{area.body}</p>
                {inArea.length ? (
                  <p className="type-label mt-3">
                    Available now:{" "}
                    {inArea.map((p, i) => (
                      <span key={p.slug}>
                        {i > 0 ? ", " : null}
                        <TextLink href={productPath(p)}>{p.name}</TextLink>
                      </span>
                    ))}
                  </p>
                ) : null}
              </RuledRow>
            );
          })}
        </div>
      </IndexedSection>

      <IndexedSection
        id="how"
        index="02"
        label="How we work"
        title="Products you can check before you pay."
        intro={
          <>
            <p>
              Each product has its own page that states what it does and what it does not include, a live demo where
              possible, documentation, and release notes on our <TextLink href="/updates">updates page</TextLink>.
            </p>
            <p className="mt-4">Every release is held to the same engineering standards:</p>
          </>
        }
      >
        <div className="mt-8 border-t border-line">
          {engineeringPrinciples.map((p) => (
            <RuledRow key={p.title} title={p.title}>
              <p>{p.body}</p>
            </RuledRow>
          ))}
        </div>
      </IndexedSection>

      <IndexedSection id="products" index="03" label="Products" title="Current products">
        <ProductLedger className="mt-10" items={products} limit={6} compact />
        <p className="mt-14 max-w-[36ch] text-[1.375rem] leading-snug tracking-[-0.015em] text-ink sm:text-[1.5rem]">
          Questions about a product, licensing or an order?{" "}
          <ArrowLink href="/contact" tone="accent">
            Write to us
          </ArrowLink>
        </p>
      </IndexedSection>
    </>
  );
}
