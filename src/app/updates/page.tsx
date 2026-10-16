import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/layout";
import { getProduct } from "@/content/products";
import { updateKindLabel, updates } from "@/content/updates";
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
        <p className="type-lead mt-5 max-w-[48ch]">Product releases and company announcements, newest first.</p>

        <ol className="mt-14 border-t border-line" aria-label="All updates">
          {updates.map((u) => {
            const product = u.productSlug ? getProduct(u.productSlug) : undefined;
            return (
              <li key={u.slug} className="border-b border-line">
                <article className="grid gap-3 py-8 md:grid-cols-12 md:gap-x-8">
                  <p className="type-label md:col-span-3">
                    {u.date ? <time dateTime={u.date}>{u.date}</time> : "Date to be confirmed"}
                    <br />
                    {updateKindLabel[u.kind]}
                    {product ? <> · {product.name}</> : null}
                  </p>
                  <div className="md:col-span-9">
                    <h2 className="type-h3">
                      <Link href={`/updates/${u.slug}`} className="hover:text-accent">
                        {u.title}
                      </Link>
                    </h2>
                    <p className="mt-2 max-w-[60ch] leading-relaxed text-ink-soft">{u.summary}</p>
                    <Link
                      href={`/updates/${u.slug}`}
                      className="mt-4 inline-block text-[0.9375rem] font-medium text-accent hover:text-accent-hover"
                    >
                      {u.kind === "release" ? "Read the release notes" : "Read the announcement"}
                      <span className="sr-only"> for {u.title}</span> <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
