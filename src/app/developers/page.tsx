import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Container, IndexedSection } from "@/components/ui/layout";
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

function ResourceRow({ r }: { r: Resource }) {
  const title = (
    <span className="inline-flex items-baseline gap-1.5 text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink group-hover:text-accent">
      {r.title}
      {r.href ? <span aria-hidden="true" className="font-medium text-accent">{r.external ? "↗" : "→"}</span> : null}
    </span>
  );
  const body = (
    <>
      <span className="text-ink-soft">{r.description}</span>
      <span className="type-label md:text-right">{r.note ?? (r.external ? "Opens in a new tab" : "")}</span>
    </>
  );
  const cls = "group grid gap-1 py-5 md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,3fr)] md:items-baseline md:gap-8";
  if (!r.href) {
    return (
      <div className={cls}>
        {title}
        {body}
      </div>
    );
  }
  if (r.external) {
    return (
      <a href={r.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {title}
        {body}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={r.href} className={cls}>
      {title}
      {body}
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
      <section aria-labelledby="dev-title">
        <Container className="pb-12 pt-14 sm:pb-16 sm:pt-20">
          <h1 id="dev-title" className="type-title">
            Developers
          </h1>
          <p className="type-lead mt-5 max-w-[48ch]">
            Documentation, demos and release notes for Syleri Technologies developer products.
          </p>
          {devProducts.length > 1 ? (
            <nav aria-label="Developer products" className="mt-10">
              <ul className="flex flex-wrap gap-x-6 border-y border-line py-1">
                {devProducts.map((p) => (
                  <li key={p.slug}>
                    <a href={`#res-${p.slug}`} className="inline-flex min-h-11 items-center text-[0.9375rem] text-ink-soft hover:text-accent">
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
        <Container className="pb-20">
          <p className="type-lead">Developer resources will be published here as products are released.</p>
        </Container>
      ) : null}

      {devProducts.map((p, i) => (
        <IndexedSection
          key={p.slug}
          id={`res-${p.slug}`}
          index={String(i + 1).padStart(2, "0")}
          label={p.name}
          title={p.name}
          intro={
            <p>
              {p.subtitle}. Resources for version <span className="font-mono text-[0.9375rem]">{p.version}</span>.
            </p>
          }
        >
          <ul className="mt-10 border-t border-line">
            {resourcesFor(p).map((r) => (
              <li key={r.title} className="border-b border-line">
                <ResourceRow r={r} />
              </li>
            ))}
          </ul>
        </IndexedSection>
      ))}

      {releases.length ? (
        <IndexedSection id="releases" index={String(devProducts.length + 1).padStart(2, "0")} label="Releases" title="Release notes">
          <ul className="mt-10 border-t border-line">
            {releases.slice(0, 8).map((u) => (
              <li key={u.slug} className="border-b border-line">
                <Link href={`/updates/${u.slug}`} className="group grid gap-1 py-5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
                  <span className="font-mono text-[0.875rem] text-muted">{u.date ?? "Date to be confirmed"}</span>
                  <span>
                    <span className="block font-mono text-[0.9375rem] text-ink group-hover:text-accent">{u.title}</span>
                    <span className="mt-1 block text-ink-soft">{u.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[62ch] text-ink-soft">
            Syleri Technologies does not offer public APIs or SDKs at this time. When that changes, their documentation will
            be published here.
          </p>
        </IndexedSection>
      ) : null}
    </>
  );
}
