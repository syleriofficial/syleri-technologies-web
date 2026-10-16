import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProductFacts } from "@/components/product-feature";
import { ProductImage } from "@/components/product-image";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { categoryName, getProduct, templateSlugs } from "@/content/products";
import { latestRelease } from "@/content/updates";
import { productMetadata } from "@/lib/metadata";
import { productBreadcrumb, productSchema } from "@/lib/schema";
import { validateContent } from "@/lib/validate-content";

/**
 * Shared product page template.
 *
 * Renders any product whose record has `page: "template"`. Products with a
 * hand-built page (`page: "custom"`) live in their own folder, e.g.
 * src/app/products/stockline/, which takes precedence over this route.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  validateContent();
  return templateSlugs();
}

type Props = { params: Promise<{ slug: string }> };

function templateProduct(slug: string) {
  const p = getProduct(slug);
  return p && p.page === "template" && p.status !== "retired" ? p : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = templateProduct((await params).slug);
  return p ? productMetadata(p) : {};
}

export default async function ProductTemplatePage({ params }: Props) {
  const p = templateProduct((await params).slug);
  if (!p) notFound();

  const release = latestRelease(p.slug);
  const canBuy = p.status === "available" && p.checkoutUrl && p.price;

  return (
    <>
      <JsonLd data={[productSchema(p), productBreadcrumb(p)]} />

      <section aria-labelledby="product-title">
        <Container className="pb-14 pt-12 sm:pb-20 sm:pt-20">
          <nav aria-label="Breadcrumb" className="type-label">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <TextLink href="/products" className="text-muted">
                  Products
                </TextLink>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-soft">
                {p.name}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <p className="type-label text-accent">
                {p.name} {p.version}
              </p>
              <h1 id="product-title" className="type-display mt-4 max-w-[18ch]">
                {p.subtitle}
              </h1>
            </div>
            <div className="lg:pt-10">
              <p className="type-lead">{p.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {canBuy ? (
                  <ButtonLink href={p.checkoutUrl!} size="lg">
                    Get {p.name} — ${p.price!.amount}
                  </ButtonLink>
                ) : null}
                {p.demoUrl ? (
                  <ButtonLink href={p.demoUrl} size="lg" variant={canBuy ? "secondary" : "primary"} newTab>
                    View Live Demo
                  </ButtonLink>
                ) : null}
                {!canBuy && !p.demoUrl ? (
                  <ButtonLink href="/contact" size="lg" variant="secondary">
                    Contact us
                  </ButtonLink>
                ) : null}
              </div>
              <ProductFacts product={p} className="mt-8 border-t border-line pt-5" />
            </div>
          </div>
        </Container>
      </section>

      {p.cover ? (
        <Section labelledBy="overview-title">
          <Container>
            <h2 id="overview-title" className="sr-only">
              Overview
            </h2>
            <ProductImage media={p.cover} priority sizes="(min-width: 1216px) 1152px, 100vw" />
          </Container>
        </Section>
      ) : null}

      {p.highlights?.length ? (
        <Section labelledBy="highlights-title">
          <Container>
            <SectionHeading id="highlights-title" title={`What ${p.name} does`} />
            <ul className="mt-10 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {p.highlights.map((h) => (
                <li key={h.title}>
                  <h3 className="font-semibold text-ink">{h.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{h.body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section labelledBy="details-title">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading id="details-title" title="Details" />
          <dl className="divide-y divide-line border-y border-line">
            {[
              ["Category", categoryName(p.category)],
              ["Type", p.kind],
              ...(p.technology?.length ? [["Technology", p.technology.join(", ")]] : []),
              ...(p.license ? [["License", `${p.license.name}: ${p.license.summary}`]] : []),
              ...(p.docs ? [["Documentation", p.docs.url ? null : p.docs.note]] : []),
            ].map(([term, desc]) => (
              <div key={term} className="grid gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-[0.9375rem] text-muted">{term}</dt>
                <dd className="text-ink-soft">
                  {term === "Documentation" && p.docs?.url ? (
                    <TextLink href={p.docs.url} newTab>
                      Read the documentation
                    </TextLink>
                  ) : (
                    desc
                  )}
                </dd>
              </div>
            ))}
            {release ? (
              <div className="grid gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-[0.9375rem] text-muted">Latest release</dt>
                <dd>
                  <TextLink href={`/updates/${release.slug}`}>{release.title}</TextLink>
                </dd>
              </div>
            ) : null}
          </dl>
        </Container>
      </Section>
    </>
  );
}
