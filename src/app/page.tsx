import Link from "next/link";
import { Figure, FigureBand } from "@/components/figure";
import { ArrowLink, ButtonLink } from "@/components/ui/button-link";
import { Container, FactsRow, IndexedSection, RuledRow, SectionIndex } from "@/components/ui/layout";
import { focusAreas } from "@/content/catalog";
import { companyStatement, workStatements } from "@/content/company";
import { featuredProducts, productPath, type Product } from "@/content/products";
import { site } from "@/content/site";
import { latestRelease, updates } from "@/content/updates";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

/** Where each "How we work" statement points, resolved from the lead product's record. */
function evidenceLink(product: Product | undefined, kind: (typeof workStatements)[number]["link"]) {
  if (!product) return null;
  if (kind === "demo") return product.demoUrl ? { href: product.demoUrl, label: "Open the demo", external: true } : null;
  if (kind === "not-included") return { href: `${productPath(product)}#not-included`, label: `${product.name}’s list`, external: false };
  const release = latestRelease(product.slug);
  return release ? { href: `/updates/${release.slug}`, label: "Release notes", external: false } : null;
}

export default function HomePage() {
  const [lead] = featuredProducts();
  const showcase = lead?.showcase;
  const latestUpdates = updates.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title">
        <Container className="pb-12 pt-14 sm:pb-20 sm:pt-24 lg:pt-28">
          <SectionIndex className="flex items-center gap-3">
            <span aria-hidden="true" className="inline-block h-0.5 w-6 bg-accent" />
            {site.name}
          </SectionIndex>
          <h1 id="hero-title" className="type-display mt-6 max-w-[17ch] sm:mt-8 lg:max-w-none">
            {companyStatement.headline[0]} <br className="hidden lg:inline" />
            {companyStatement.headline[1]}
          </h1>
          <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
            <p className="type-lead max-w-[38rem] lg:col-span-7">{companyStatement.lead}</p>
            {lead ? (
              <div className="flex flex-col items-start gap-5 xs:flex-row xs:items-center xs:gap-6 lg:col-span-5 lg:justify-end">
                <ButtonLink href={productPath(lead)} size="lg">
                  Explore {lead.name}
                </ButtonLink>
                {lead.demoUrl ? (
                  <ArrowLink href={lead.demoUrl} newTab>
                    Open the live demo
                  </ArrowLink>
                ) : null}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* The one figure band: the lead product's main screen */}
      {lead?.cover ? (
        <FigureBand
          media={lead.cover}
          index="01"
          label={`${lead.name} screenshot`}
          caption={`${lead.name} ${lead.version} · ${lead.cover.brief}`}
          aside="Real screen · sample data"
        />
      ) : null}

      {/* 01 Lead product */}
      {lead && showcase ? (
        <IndexedSection id="product" index="01" label={lead.name} title={showcase.title} intro={<p>{showcase.lead}</p>} rule={false}>
          <FactsRow
            className="mt-10"
            items={[
              { label: "Version", value: lead.version },
              ...(lead.price ? [{ label: "Price", value: `$${lead.price.amount} one-time` }] : []),
              ...(lead.license ? [{ label: "License", value: lead.license.name.replace(/ License$/, "") }] : []),
              ...(lead.stackSummary ? [{ label: "Stack", value: lead.stackSummary }] : []),
            ]}
          />
          <Figure
            className="mt-12"
            index="02"
            caption={showcase.caption}
            media={showcase.figure ?? showcase.image}
            mediaDark={showcase.figureDark}
            sizes="(min-width: 1216px) 870px, (min-width: 1024px) 72vw, calc(100vw - 4rem)"
          />
          <p className="mt-10">
            <ArrowLink href={`${productPath(lead)}#not-included`} tone="accent">
              See what’s included and what isn’t
            </ArrowLink>
          </p>
        </IndexedSection>
      ) : null}

      {/* 02 What we work on */}
      <IndexedSection id="work" index="02" label="What we work on" title="Business operations, and the code behind them.">
        <div className="mt-10 border-t border-line">
          {focusAreas.map((area) => (
            <RuledRow key={area.id} title={area.title}>
              <p>{area.body}</p>
            </RuledRow>
          ))}
        </div>
      </IndexedSection>

      {/* 03 How we work */}
      <IndexedSection id="how" index="03" label="How we work" title="You can check everything before you pay.">
        <ul className="mt-10 border-t border-line">
          {workStatements.map((s) => {
            const link = evidenceLink(lead, s.link);
            return (
              <li key={s.link} className="flex flex-col gap-1.5 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <span className="text-ink">{s.body}</span>
                {link ? (
                  <ArrowLink href={link.href} newTab={link.external} tone="accent" className="shrink-0">
                    {link.label}
                  </ArrowLink>
                ) : null}
              </li>
            );
          })}
        </ul>
      </IndexedSection>

      {/* 04 Releases + contact */}
      <IndexedSection id="releases" index="04" label="Releases" hideTitle>
        {latestUpdates.length ? (
          <ul className="border-t border-line">
            {latestUpdates.map((u) => (
              <li key={u.slug} className="border-b border-line">
                <Link
                  href={`/updates/${u.slug}`}
                  className="group grid gap-1 py-5 md:grid-cols-[8.5rem_11rem_minmax(0,1fr)_auto] md:items-baseline md:gap-6"
                >
                  {u.date ? (
                    <time dateTime={u.date} className="font-mono text-[0.875rem] text-muted">
                      {u.date}
                    </time>
                  ) : (
                    <span />
                  )}
                  <span className="font-mono text-[0.875rem] text-ink">{u.title}</span>
                  <span className="text-ink-soft">{u.summary}</span>
                  <span aria-hidden="true" className="hidden font-medium text-accent group-hover:text-accent-hover md:inline">
                    Read →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
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
