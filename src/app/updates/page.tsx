import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/layout";
import { formatDate, updateKindLabel, updates } from "@/content/updates";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Updates",
  description: "Product releases and company announcements from Syleri Technologies.",
  path: "/updates",
});

export default function UpdatesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Updates", path: "/updates" },
        ])}
      />
      <Container className="pb-24 pt-14 sm:pt-20">
        <h1 className="type-title">Updates</h1>
        <p className="type-lead mt-5 max-w-[52ch]">Product releases and company announcements, newest first.</p>

        <ol className="mt-14 border-t border-line" aria-label="All updates">
          {updates.map((u) => (
            <li key={u.slug} className="border-b border-line">
              <article className="grid gap-2 py-8 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-10">
                <p className="text-[0.9375rem] text-muted">
                  {updateKindLabel[u.kind]}
                  {u.date ? (
                    <>
                      <br />
                      <time dateTime={u.date}>{formatDate(u.date)}</time>
                    </>
                  ) : null}
                </p>
                <div>
                  <h2 className="type-h3">
                    <Link href={`/updates/${u.slug}`} className="hover:text-accent">
                      {u.title}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-[60ch] leading-relaxed text-muted">{u.summary}</p>
                  <Link
                    href={`/updates/${u.slug}`}
                    className="mt-4 inline-block text-[0.9375rem] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                  >
                    Read release notes<span className="sr-only"> for {u.title}</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
