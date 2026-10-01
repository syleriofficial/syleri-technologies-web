import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { ProductLedger } from "@/components/product-ledger";
import { JsonLd } from "@/components/json-ld";
import { products } from "@/content/products";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Company",
  description:
    "Syleri Technologies is an early-stage software company that designs and develops software products and developer tools.",
  path: "/company",
});

const productPhilosophy = [
  {
    title: "Complete, not partial",
    body: "A product should do its job end to end within its stated scope. If something is out of scope, we say so plainly on the product page.",
  },
  {
    title: "Honest descriptions",
    body: "We describe what ships today. Limitations, requirements and license terms are visible before purchase, not discovered after.",
  },
  {
    title: "Try before you commit",
    body: "Where it makes sense, products come with a live demo so you can judge the work directly.",
  },
];

const engineeringPrinciples = [
  {
    title: "Typed throughout",
    body: "TypeScript and consistent structure make a codebase safer to change, for us and for the developers who build on our products.",
  },
  {
    title: "Accessible baseline",
    body: "Semantic markup, keyboard support and readable contrast are requirements of a finished product.",
  },
  {
    title: "Fewer dependencies",
    body: "We choose well-maintained, widely used libraries and avoid adding what a product does not need.",
  },
  {
    title: "Performance as a feature",
    body: "Fast pages and responsive interfaces are part of quality, not a later optimization pass.",
  },
];

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
              We are an early-stage software company that designs and develops software products and developer tools.
            </p>
            <p className="max-w-[52ch] leading-relaxed text-muted">
              We are building a portfolio of products over time and release each one when it is ready to be relied
              on. We would rather earn trust through the quality of each release than through claims about scale.
            </p>
          </div>
        </Container>
      </section>

      <Section labelledBy="what-title">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading
            id="what-title"
            title="What we build"
            intro="Software products and developer tools for teams that build and run real operations. The catalog grows as each new product is ready."
          />
          <ProductLedger items={products} headingId="company-index" heading="Current products" />
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
              We release products when they are ready to be relied on, document them, and keep their public descriptions
              accurate as they change. Release notes for every product are published on our{" "}
              <TextLink href="/updates">updates page</TextLink>
              .
            </p>
          </div>
        </Container>
      </Section>

      <Section labelledBy="philosophy-title">
        <Container>
          <SectionHeading id="philosophy-title" title="Product philosophy" />
          <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {productPhilosophy.map((p) => (
              <div key={p.title} className="border-t-2 border-ink pt-5">
                <h3 className="text-[1.0625rem] font-[640] tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section labelledBy="engineering-title" tone="surface">
        <Container>
          <SectionHeading id="engineering-title" title="Engineering principles" />
          <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringPrinciples.map((p) => (
              <div key={p.title} className="border-t-2 border-ink pt-5">
                <h3 className="text-[1.0625rem] font-[640] tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <section aria-labelledby="company-cta" className="border-t border-line">
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
