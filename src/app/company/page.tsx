import { JsonLd } from "@/components/json-ld";
import { ProductLedger } from "@/components/product-ledger";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { focusAreas } from "@/content/catalog";
import { engineeringPrinciples, productPrinciples } from "@/content/company";
import { productPath, products, productsInArea } from "@/content/products";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Company",
  description:
    "Syleri Technologies is a technology company that builds software, platforms and technology products.",
  path: "/company",
});

function PrincipleList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className={`mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {items.map((p) => (
        <div key={p.title} className="border-t-2 border-ink pt-5">
          <h3 className="text-[1.0625rem] font-[640] tracking-[-0.01em]">{p.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function CompanyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Company", path: "/company" },
        ])}
      />
      <section aria-labelledby="company-title" className="border-b border-line">
        <Container className="pb-16 pt-14 sm:pb-24 sm:pt-20">
          <h1 id="company-title" className="type-title max-w-[20ch]">
            Syleri Technologies
          </h1>
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-16">
            <p className="type-lead max-w-[40ch]">
              A technology company that builds software, platforms and technology products.
            </p>
            <p className="max-w-[52ch] leading-relaxed text-muted">
              We are building a portfolio of products across several areas of work, and we release each one when it is
              ready to be relied on. We would rather earn trust through the quality of each release than through claims
              about scale.
            </p>
          </div>
        </Container>
      </section>

      <Section labelledBy="what-title">
        <Container>
          <SectionHeading
            id="what-title"
            title="What we build"
            intro="Software for teams that build and run real operations. These are the areas we work in."
          />
          <ul className="mt-10 border-t border-line">
            {focusAreas.map((area) => {
              const inArea = productsInArea(area.id);
              return (
                <li key={area.id} className="grid gap-3 border-b border-line py-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12">
                  <h3 className="type-h3">{area.title}</h3>
                  <div>
                    <p className="max-w-[60ch] leading-relaxed text-ink-soft">{area.body}</p>
                    {inArea.length ? (
                      <p className="mt-3 text-[0.9375rem] text-muted">
                        Available now:{" "}
                        {inArea.map((p, i) => (
                          <span key={p.slug}>
                            {i > 0 ? ", " : null}
                            <TextLink href={productPath(p)}>{p.name}</TextLink>
                          </span>
                        ))}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="approach-title" tone="surface">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading id="approach-title" title="Our approach" />
          <div className="max-w-[60ch] space-y-5 leading-relaxed text-ink-soft">
            <p>
              We focus on problems where software usually becomes complicated — operations, data and the many screens a
              business depends on — and work to make them simpler to build and to use.
            </p>
            <p>
              Each product is a complete thing in its own right, with its own page, documentation and release notes.
              Public descriptions are kept accurate as products change, and every release is recorded on our{" "}
              <TextLink href="/updates">updates page</TextLink>.
            </p>
          </div>
        </Container>
      </Section>

      <Section labelledBy="philosophy-title">
        <Container>
          <SectionHeading id="philosophy-title" title="Product philosophy" />
          <PrincipleList items={productPrinciples} />
        </Container>
      </Section>

      <Section labelledBy="engineering-title" tone="surface">
        <Container>
          <SectionHeading id="engineering-title" title="Engineering principles" />
          <PrincipleList items={engineeringPrinciples} />
        </Container>
      </Section>

      <Section labelledBy="products-title">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading
            id="products-title"
            title="Products"
            intro="The current Syleri Technologies product line. New products are added as they are released."
          />
          <ProductLedger items={products} headingId="company-index" heading="Current products" footnote={null} limit={6} compact />
        </Container>
      </Section>

      <section aria-labelledby="company-cta" className="border-t border-line bg-surface">
        <Container className="py-20 sm:py-24">
          <h2 id="company-cta" className="type-h2 max-w-[24ch]">
            Explore our products, or get in touch.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/products" size="lg">
              Explore products
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
