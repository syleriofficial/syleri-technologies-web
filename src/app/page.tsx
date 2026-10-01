import Link from "next/link";
import { ProductCard, ProductFeature } from "@/components/product-feature";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { focusAreas } from "@/content/catalog";
import { companyStatement, engineeringPrinciples, productPrinciples } from "@/content/company";
import { developerProducts, featuredProducts, getProduct, productPath, products, productsInArea, type Product } from "@/content/products";
import { site } from "@/content/site";
import { formatDate, updateKindLabel, updates } from "@/content/updates";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

function ProductNames({ items, max = 3 }: { items: Product[]; max?: number }) {
  const shown = items.slice(0, max);
  return (
    <>
      {shown.map((p, i) => (
        <span key={p.slug}>
          {i > 0 ? ", " : null}
          <Link href={productPath(p)} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
            {p.name}
          </Link>
        </span>
      ))}
      {items.length > max ? <span> and {items.length - max} more</span> : null}
    </>
  );
}

export default function HomePage() {
  const [lead, ...moreFeatured] = featuredProducts();
  const available = products.filter((p) => p.status === "available");
  const latestRelease = updates.find((u) => u.kind === "release");
  const devProducts = developerProducts();
  const withDocs = devProducts.filter((p) => p.docs);
  const withDemos = products.filter((p) => p.demoUrl);
  const releases = updates.filter((u) => u.kind === "release");
  const latestUpdates = updates.slice(0, 3);

  return (
    <>
      {/* 1. Company hero */}
      <section aria-labelledby="hero-title" className="border-b border-line">
        <Container className="pt-14 sm:pt-20 lg:pt-28">
          <p className="text-[0.9375rem] font-[560] text-accent">{site.name}</p>
          <h1 id="hero-title" className="type-display mt-5 max-w-[16ch]">
            {companyStatement.headline}
          </h1>
          <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
            <p className="type-lead max-w-[52ch]">{companyStatement.lead}</p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href="/products" size="lg">
                Explore products
              </ButtonLink>
              <ButtonLink href="/company" size="lg" variant="secondary">
                About Syleri Technologies
              </ButtonLink>
            </div>
          </div>

          {/* Company profile: facts only, derived from content. */}
          <dl className="mt-14 grid border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            <div className="border-b border-line py-6 sm:pr-6 lg:border-b-0 lg:border-r">
              <dt className="text-[0.875rem] text-muted">What we build</dt>
              <dd className="mt-1.5 text-[1.0625rem] font-[560] leading-snug">Software products and developer tools</dd>
            </div>
            <div className="border-b border-line py-6 sm:pl-6 lg:border-b-0 lg:border-r lg:px-6">
              <dt className="text-[0.875rem] text-muted">Focus areas</dt>
              <dd className="mt-1.5 text-[1.0625rem] font-[560] leading-snug">{focusAreas.map((a) => a.title).join(", ")}</dd>
            </div>
            <div className="border-b border-line py-6 sm:border-b-0 sm:pr-6 lg:border-r lg:px-6">
              <dt className="text-[0.875rem] text-muted">Available products</dt>
              <dd className="mt-1.5 text-[1.0625rem] font-[560] leading-snug">
                {available.length ? <ProductNames items={available} /> : "—"}
              </dd>
            </div>
            <div className="py-6 sm:pl-6">
              <dt className="text-[0.875rem] text-muted">Latest release</dt>
              <dd className="mt-1.5 text-[1.0625rem] font-[560] leading-snug">
                {latestRelease ? (
                  <Link
                    href={`/updates/${latestRelease.slug}`}
                    className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                  >
                    {latestRelease.title}
                  </Link>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* 2. Featured products */}
      {lead ? (
        <Section labelledBy="featured-title">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                id="featured-title"
                title={moreFeatured.length ? "Featured products" : "Featured product"}
                intro="Selected from the Syleri Technologies product line."
              />
              <TextLink href="/products" className="text-[0.9375rem]">
                All products
              </TextLink>
            </div>
            <div className="mt-10">
              <ProductFeature product={lead} mode="explore" priority />
            </div>
            {moreFeatured.length ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {moreFeatured.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {/* 3. What we build */}
      <Section labelledBy="build-title" tone="surface">
        <Container>
          <SectionHeading
            id="build-title"
            title="What we build"
            intro="Syleri Technologies works across the areas below. Each lists only what is available today."
          />
          <ul className="mt-12 border-t border-line">
            {focusAreas.map((area) => {
              const inArea = productsInArea(area.id);
              return (
                <li key={area.id} className="grid gap-3 border-b border-line py-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12">
                  <h3 className="type-h3">{area.title}</h3>
                  <div>
                    <p className="max-w-[60ch] leading-relaxed text-ink-soft">{area.body}</p>
                    {inArea.length ? (
                      <p className="mt-3 text-[0.9375rem] text-muted">
                        Available now: <ProductNames items={inArea} max={4} />
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* 4. Developer ecosystem */}
      <Section labelledBy="dev-title">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="dev-title"
              title="Developer ecosystem"
              intro="Documentation, live demos, release notes and source code for our developer products, gathered in one hub that grows with every release."
            />
            <div className="mt-8">
              <ButtonLink href="/developers" variant="secondary">
                Visit the developer hub
              </ButtonLink>
            </div>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            <div className="bg-raised p-6">
              <dt className="font-[620]">Developer products</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                {devProducts.length ? <ProductNames items={devProducts} /> : "None released yet"}
              </dd>
            </div>
            <div className="bg-raised p-6">
              <dt className="font-[620]">Documentation</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                {withDocs.length ? <>Provided with <ProductNames items={withDocs} /></> : "Published with each developer product"}
              </dd>
            </div>
            <div className="bg-raised p-6">
              <dt className="font-[620]">Live demos</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                {withDemos.length ? <>Try <ProductNames items={withDemos} /> in your browser</> : "Offered where a product can run in the browser"}
              </dd>
            </div>
            <div className="bg-raised p-6">
              <dt className="font-[620]">Release notes</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                {releases.length ? (
                  <>
                    <Link href="/updates" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                      {releases.length} {releases.length === 1 ? "release" : "releases"}
                    </Link>{" "}
                    documented
                  </>
                ) : (
                  "Published with every release"
                )}
              </dd>
            </div>
          </dl>
        </Container>
      </Section>

      {/* 5. Product & engineering principles */}
      <Section labelledBy="principles-title" tone="surface">
        <Container>
          <SectionHeading
            id="principles-title"
            title="How we build"
            intro="The standards every Syleri Technologies product is held to, whatever it does."
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)] lg:gap-16">
            <div>
              <h3 className="text-[0.9375rem] font-[620] text-muted">Product</h3>
              <ul className="mt-4 border-t-2 border-ink">
                {productPrinciples.map((p) => (
                  <li key={p.title} className="border-b border-line py-5">
                    <h4 className="text-[1.0625rem] font-[640] tracking-[-0.01em]">{p.title}</h4>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[0.9375rem] font-[620] text-muted">Engineering</h3>
              <ul className="mt-4 grid border-t-2 border-ink sm:grid-cols-2 sm:gap-x-8">
                {engineeringPrinciples.map((p) => (
                  <li key={p.title} className="border-b border-line py-5">
                    <h4 className="text-[1.0625rem] font-[640] tracking-[-0.01em]">{p.title}</h4>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Latest updates */}
      {latestUpdates.length ? (
        <Section labelledBy="updates-title">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading id="updates-title" title="Latest updates" />
              <TextLink href="/updates" className="text-[0.9375rem]">
                All updates
              </TextLink>
            </div>
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
          </Container>
        </Section>
      ) : null}

      {/* 7. Company CTA */}
      <section aria-labelledby="cta-title" className="border-t border-line bg-surface">
        <Container className="grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <div>
            <h2 id="cta-title" className="type-title max-w-[18ch]">
              Get to know Syleri Technologies.
            </h2>
            <p className="type-lead mt-5 max-w-[48ch]">
              How we work, what we focus on and the standards behind every product.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href="/company" size="lg">
              About the company
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
