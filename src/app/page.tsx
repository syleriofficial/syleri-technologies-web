import Link from "next/link";
import { ProductCard } from "@/components/product-feature";
import { ProductShowcase } from "@/components/product-showcase";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { focusAreas } from "@/content/catalog";
import { companyStatement, homePrinciples } from "@/content/company";
import { featuredProducts, getProduct, products } from "@/content/products";
import { site } from "@/content/site";
import { formatDate, updateKindLabel, updates } from "@/content/updates";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const [lead, ...moreFeatured] = featuredProducts();
  const available = products.filter((p) => p.status === "available");
  const latestUpdates = updates.slice(0, 3);

  return (
    <>
      {/* 1. Company hero */}
      <section aria-labelledby="hero-title">
        <Container className="pb-4 pt-16 sm:pt-24 lg:pt-32">
          <p className="text-[0.9375rem] font-[560] text-muted sm:text-base">{site.tagline}</p>
          <h1 id="hero-title" className="type-display mt-5 max-w-[16ch]">
            {companyStatement.headline}
          </h1>
          <p className="type-lead mt-7 max-w-[54ch] sm:mt-8">{companyStatement.lead}</p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <ButtonLink href="/products" size="lg">
              Explore products
            </ButtonLink>
            <ButtonLink href="/company" size="lg" variant="secondary">
              About Syleri Technologies
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* 2. Lead product showcase (+ any further featured products as cards) */}
      {lead?.showcase ? (
        <ProductShowcase product={lead} eyebrow={available.length === 1 ? "Our first product" : "Featured product"} />
      ) : null}
      {moreFeatured.length ? (
        <section aria-label="More featured products" className="pb-20 sm:pb-28">
          <Container className="grid gap-6 md:grid-cols-2">
            {moreFeatured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </Container>
        </section>
      ) : null}

      {/* 3. What we build */}
      <Section labelledBy="build-title" tone="surface">
        <Container>
          <SectionHeading id="build-title" title="What we build" />
          <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {focusAreas.map((area) => (
              <li key={area.id} className="border-t border-line pt-6">
                <h3 className="type-h3">{area.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{area.body}</p>
              </li>
            ))}
            <li className="border-t border-line pt-6">
              <h3 className="type-h3">For developers</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">
                Documentation, live demos and release notes for our developer products.
              </p>
              <p className="mt-4">
                <TextLink href="/developers" className="font-[560]">
                  Visit the developer hub
                </TextLink>
              </p>
            </li>
          </ul>
        </Container>
      </Section>

      {/* 4. How we build */}
      <Section labelledBy="principles-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="principles-title"
              title="How we build"
              intro="The standards every Syleri Technologies product is held to, whatever it does."
            />
            <TextLink href="/company" className="text-[0.9375rem]">
              More about how we work
            </TextLink>
          </div>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {homePrinciples.map((p) => (
              <li key={p.title} className="border-t-2 border-ink pt-5">
                <h3 className="text-[1.125rem] font-[640] tracking-[-0.012em]">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 5. Latest updates + contact */}
      <Section labelledBy="updates-title" tone="surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="updates-title" title="Latest updates" />
            <TextLink href="/updates" className="text-[0.9375rem]">
              All updates
            </TextLink>
          </div>
          {latestUpdates.length ? (
            <ul className="mt-10 border-t border-line">
              {latestUpdates.map((u) => {
                const product = u.productSlug ? getProduct(u.productSlug) : undefined;
                return (
                  <li key={u.slug} className="border-b border-line">
                    <Link href={`/updates/${u.slug}`} className="group grid gap-1 py-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-8">
                      <span className="text-[0.9375rem] text-muted">
                        {updateKindLabel[u.kind]}
                        {product ? <span>, {product.name}</span> : null}
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
                );
              })}
            </ul>
          ) : null}

          <div className="mt-16 flex flex-col gap-5 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[1.1875rem] font-[560] leading-snug tracking-[-0.01em] text-ink">
              Questions about our products, licensing or an order?
            </p>
            <ButtonLink href="/contact" variant="secondary" size="lg" className="self-start sm:self-auto">
              Contact
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
