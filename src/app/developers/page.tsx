import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ExternalIcon } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { developerResources, type DeveloperResource } from "@/content/developers";
import { products } from "@/content/products";
import { updates } from "@/content/updates";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Developers",
  description:
    "Developer products, documentation, demos and release information from Syleri Technologies, starting with Stockline for Next.js.",
  path: "/developers",
});

function ResourceItem({ r }: { r: DeveloperResource }) {
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

  if (!r.href) {
    return <div className="h-full bg-raised p-6">{inner}</div>;
  }
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
  const devProducts = products.filter((p) => p.forDevelopers);
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
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4 text-[0.9375rem]">
            <div>
              <dt className="text-muted">Developer products</dt>
              <dd className="mt-0.5 text-ink">{devProducts.map((p) => p.name).join(", ")}</dd>
            </div>
            <div>
              <dt className="text-muted">Latest release</dt>
              <dd className="mt-0.5 text-ink">{releases[0]?.title ?? "—"}</dd>
            </div>
          </dl>
        </Container>
      </section>

      {developerResources.map((group) => {
        const id = `res-${group.productSlug}`;
        return (
          <Section key={group.productSlug} labelledBy={id}>
            <Container>
              <SectionHeading
                id={id}
                title={group.productName}
                intro={
                  <>
                    Resources for {group.productName} {group.version}.
                  </>
                }
              />
              <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {group.resources.map((r) => (
                  <li key={r.title}>
                    <ResourceItem r={r} />
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        );
      })}

      <Section labelledBy="releases-title" tone="surface">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading
            id="releases-title"
            title="Release information"
            intro="Every product release is recorded on the updates page with notes on what changed."
          />
          <ul className="border-t border-line">
            {releases.map((u) => (
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
