import Link from "next/link";
import { ProductFeature } from "@/components/product-feature";
import { ProductLedger } from "@/components/product-ledger";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { products, stockline } from "@/content/products";
import { site } from "@/content/site";
import { formatDate, updateKindLabel, updates } from "@/content/updates";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const focusAreas = [
  {
    title: "Developer products",
    body: "Starter kits, components and tools that give engineering teams a working, well-structured foundation instead of a blank repository.",
    examples: [stockline],
  },
  {
    title: "Operational software",
    body: "Software for the day-to-day work of running a business — selling, stocking, purchasing and reporting — where clarity matters more than novelty.",
    examples: [stockline],
  },
];

const principles = [
  {
    title: "Say exactly what it does",
    body: "Product pages describe what ships today, including what is not included. No inflated claims, no invented metrics.",
  },
  {
    title: "Typed and maintainable",
    body: "TypeScript throughout, consistent structure and readable code, so the people who extend our products can do so with confidence.",
  },
  {
    title: "Accessible by default",
    body: "Semantic markup, keyboard support and sufficient contrast are part of the baseline, not an afterthought.",
  },
  {
    title: "Useful from the first run",
    body: "Products should be clear to evaluate and quick to start with: a live demo where possible, documentation with every release.",
  },
];

export default function HomePage() {
  const latest = updates.slice(0, 3);

  return (
    <>
      {/* 1. Hero */}
      <section aria-labelledby="hero-title" className="border-b border-line">
        <Container className="pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pt-28">
          <p className="text-[0.9375rem] font-[560] text-accent">Syleri Technologies</p>
          <h1 id="hero-title" className="type-display mt-4 max-w-[17ch]">
            Technology products built to make complex work simpler.
          </h1>
          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <p className="type-lead max-w-[38ch]">
                We design and develop software products and developer tools — carefully engineered, honestly described
                and built to be put to work.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/products" size="lg">
                  Explore products
                </ButtonLink>
                <ButtonLink href="/company" size="lg" variant="secondary">
                  About Syleri Technologies
                </ButtonLink>
              </div>
            </div>
            <ProductLedger items={products} headingId="hero-index" />
          </div>
        </Container>
      </section>

      {/* 2. Featured products */}
      <Section labelledBy="featured-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="featured-title"
              title="Featured product"
              intro="Stockline is the first commercial product from Syleri Technologies."
            />
            <TextLink href="/products" className="text-[0.9375rem]">
              All products
            </TextLink>
          </div>
          <div className="mt-10">
            <ProductFeature product={stockline} shot="pos" primaryLabel="Explore Stockline" />
          </div>
        </Container>
      </Section>

      {/* 3. What we build */}
      <Section labelledBy="build-title" tone="surface">
        <Container>
          <SectionHeading
            id="build-title"
            title="What Syleri Technologies builds"
            intro="Two areas of focus, connected by the same standard of engineering."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {focusAreas.map((area) => (
              <div key={area.title} className="flex flex-col bg-raised p-6 sm:p-8">
                <h3 className="type-h3">{area.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{area.body}</p>
                <p className="mt-6 border-t border-line pt-4 text-[0.9375rem] text-muted md:mt-auto">
                  Available now:{" "}
                  {area.examples.map((p) => (
                    <Link key={p.slug} href={p.href} className="font-[560] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                      {p.name}
                    </Link>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Developers */}
      <Section labelledBy="dev-title">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="dev-title"
              title="For developers who read the source"
              intro="Our developer products ship as complete, readable source code on a modern, widely used stack — yours to study, adapt and build on."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/developers" variant="secondary">
                Visit the developer hub
              </ButtonLink>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line">
            <h3 className="relative z-10 border-b border-line bg-bg px-6 py-3.5 text-[0.9375rem] font-[620]">Stockline is built with</h3>
            <ul className="-mt-px grid grid-cols-2 gap-x-6 px-6 pb-1 sm:grid-cols-3">
              {stockline.technology.map((t) => (
                <li key={t} className="border-t border-line py-3.5 text-[0.9375rem] text-ink-soft">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 5. Principles */}
      <Section labelledBy="principles-title" tone="surface">
        <Container>
          <SectionHeading id="principles-title" title="How we work" />
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div key={p.title} className="border-t-2 border-ink pt-5">
                <h3 className="text-[1.0625rem] font-[640] tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Latest updates */}
      <Section labelledBy="updates-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="updates-title" title="Latest updates" />
            <TextLink href="/updates" className="text-[0.9375rem]">
              All updates
            </TextLink>
          </div>
          <ul className="mt-10 border-t border-line">
            {latest.map((u) => (
              <li key={u.slug} className="border-b border-line">
                <Link href={`/updates/${u.slug}`} className="group grid gap-1 py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
                  <span className="text-[0.9375rem] text-muted">
                    {updateKindLabel[u.kind]}
                    {u.date ? (
                      <>
                        <br className="hidden sm:block" />
                        <span className="sm:hidden">, </span>
                        <time dateTime={u.date}>{formatDate(u.date)}</time>
                      </>
                    ) : null}
                  </span>
                  <span>
                    <span className="block text-lg font-[620] tracking-[-0.01em] group-hover:text-accent">{u.title}</span>
                    <span className="mt-1 block text-muted">{u.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 7. Final CTA */}
      <section aria-labelledby="cta-title" className="border-t border-line">
        <Container className="py-20 sm:py-28">
          <h2 id="cta-title" className="type-title max-w-[20ch]">
            See what we&rsquo;ve built, and what we&rsquo;re building next.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/products" size="lg">
              Explore products
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
