import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ExternalIcon } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { developerProducts, productPath, type Product } from "@/content/products";
import { latestRelease, updates } from "@/content/updates";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Developers",
  description: "Developer products, documentation, demos and release information from Syleri Technologies.",
  path: "/developers",
});

type Resource = { title: string; description: string; href?: string; external?: boolean; note?: string };

/** Resources are derived from the product record — nothing to maintain per product here. */
function resourcesFor(p: Product): Resource[] {
  const list: Resource[] = [];
  if (p.docs) {
    list.push({
      title: `${p.name} documentation`,
      description: `Setup, structure and customization guidance for ${p.name}.`,
      href: p.docs.url,
      external: !!p.docs.url,
      note: p.docs.url ? undefined : p.docs.note,
    });
  }
  if (p.demoUrl) {
    list.push({
      title: "Live demo",
      description: `Explore the running ${p.name} interface in your browser.`,
      href: p.demoUrl,
      external: true,
    });
  }
  list.push({
    title: "Product page",
    description: "Features, technology, pricing and license details.",
    href: productPath(p),
  });
  const release = latestRelease(p.slug);
  if (release) {
    list.push({ title: "Release notes", description: `What shipped in ${release.title}.`, href: `/updates/${release.slug}` });
  }
  return list;
}

function ResourceItem({ r }: { r: Resource }) {
  const inner = (
    <>
      <span className="flex items-center gap-2 text-[1.0625rem] font-[620] tracking-[-0.01em] text-ink group-hover:text-accent">
        {r.title}
        {r.external ? <ExternalIcon className="size-3.5 text-muted" /> : null}
      </span>
      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted">{r.description}</span>
      {r.note ? <span className="mt-3 block text-[0.875rem] text-ink-soft">{r.note}</span> : null}
    </>
  );

  if (!r.href) return <div className="h-full bg-raised p-6">{inner}</div>;
  if (r.external) {
    return (
      <a href={r.href} target="_blank" rel="noopener noreferrer" className="group block h-full bg-raised p-6 transition-colors hover:bg-surface">
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={r.href} className="group block h-full bg-raised p-6 transition-colors hover:bg-surface">
      {inner}
    </Link>
  );
}

export default function DevelopersPage() {
  const devProducts = developerProducts();
  const releases = updates.filter((u) => u.kind === "release");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Developers", path: "/developers" },
        ])}
      />
      <section aria-labelledby="dev-title" className="border-b border-line">
        <Container className="pb-16 pt-14 sm:pb-20 sm:pt-20">
          <h1 id="dev-title" className="type-title">
            Developers
          </h1>
          <p className="type-lead mt-5 max-w-[52ch]">
            Documentation, demos, technical resources and release information for Syleri Technologies developer
            products.
          </p>
          {devProducts.length > 1 ? (
            <nav aria-label="Developer products" className="mt-10">
              <ul className="flex flex-wrap gap-2">
                {devProducts.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={`#res-${p.slug}`}
                      className="inline-flex h-9 items-center rounded-lg border border-line px-3 text-[0.9375rem] text-ink-soft hover:border-line-strong hover:text-ink"
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </Container>
      </section>

      {devProducts.length === 0 ? (
        <Container className="py-20">
          <p className="type-lead">Developer resources will be published here as products are released.</p>
        </Container>
      ) : null}

      {devProducts.map((p, i) => {
        const id = `res-${p.slug}`;
        return (
          <Section key={p.slug} id={id} labelledBy={`${id}-title`} tone={i % 2 === 1 ? "surface" : "base"} className="scroll-mt-20">
            <Container>
              <SectionHeading id={`${id}-title`} title={p.name} intro={`${p.subtitle}. Resources for version ${p.version}.`} />
              <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {resourcesFor(p).map((r) => (
                  <li key={r.title}>
                    <ResourceItem r={r} />
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        );
      })}

      {releases.length ? (
        <Section labelledBy="releases-title" tone="surface">
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <SectionHeading
              id="releases-title"
              title="Release information"
              intro="Every product release is recorded on the updates page with notes on what changed."
            />
            <ul className="border-t border-line">
              {releases.slice(0, 8).map((u) => (
                <li key={u.slug} className="border-b border-line">
                  <Link href={`/updates/${u.slug}`} className="group block py-5">
                    <span className="block font-[620] group-hover:text-accent">{u.title}</span>
                    <span className="mt-1 block text-[0.9375rem] text-muted">{u.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section labelledBy="api-title">
        <Container>
          <SectionHeading
            id="api-title"
            title="APIs and SDKs"
            intro="Syleri Technologies does not offer public APIs or SDKs at this time. When that changes, documentation will be published here."
          />
        </Container>
      </Section>
    </>
  );
}
