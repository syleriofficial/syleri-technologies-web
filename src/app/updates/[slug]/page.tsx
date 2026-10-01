import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { TextLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/layout";
import { site } from "@/content/site";
import { formatDate, getUpdate, updateKindLabel, updates } from "@/content/updates";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return updates.map((u) => ({ slug: u.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const u = getUpdate(slug);
  if (!u) return {};
  return pageMetadata({ title: u.title, description: u.summary, path: `/updates/${u.slug}` });
}

export default async function UpdatePage({ params }: Props) {
  const { slug } = await params;
  const u = getUpdate(slug);
  if (!u) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: u.title,
    description: u.summary,
    url: `${site.url}/updates/${u.slug}`,
    ...(u.date ? { datePublished: u.date } : {}),
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <JsonLd
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Updates", path: "/updates" },
            { name: u.title, path: `/updates/${u.slug}` },
          ]),
        ]}
      />
      <Container className="pb-24 pt-12 sm:pt-20">
        <nav aria-label="Breadcrumb" className="text-[0.875rem] text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <TextLink href="/updates" className="text-muted">
                Updates
              </TextLink>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink-soft">
              {u.title}
            </li>
          </ol>
        </nav>

        <article className="mt-8 max-w-[44rem]">
          <p className="text-[0.9375rem] text-muted">
            {updateKindLabel[u.kind]}
            {u.date ? (
              <>
                {", "}
                <time dateTime={u.date}>{formatDate(u.date)}</time>
              </>
            ) : null}
          </p>
          <h1 className="type-title mt-3">{u.title}</h1>
          <p className="type-lead mt-5">{u.summary}</p>

          <div className="prose-syleri mt-10">
            {u.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
            {u.highlights?.length ? (
              <>
                <h2>Highlights</h2>
                <ul>
                  {u.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          {u.links?.length ? (
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6 text-[0.9375rem]">
              {u.links.map((l) => (
                <li key={l.href}>
                  <TextLink href={l.href} newTab={l.external}>
                    {l.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-12 text-[0.9375rem]">
            <Link href="/updates" className="text-muted hover:text-ink">
              Back to all updates
            </Link>
          </p>
        </article>
      </Container>
    </>
  );
}
