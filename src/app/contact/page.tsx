import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/layout";
import { Notice } from "@/components/ui/notice";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Syleri Technologies about products, licensing and orders.",
  path: "/contact",
});

/** Shown only if the contact form is switched off. No email address is ever published. */
const CONTACT_STATUS = "Contact options are being finalized. Product customers can use the support channel provided with their purchase.";

/** Display form of the site's own domain, derived from site.url. */
const websiteLabel = new URL(site.url).hostname.replace(/^www\./, "");

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Container className="pb-24 pt-14 sm:pt-20">
        <header className="max-w-[46rem]">
          <h1 className="type-title">Contact</h1>
          <p className="type-lead mt-5 max-w-[44ch]">
            Questions about our products, licensing or an order? Send us a message.
          </p>
        </header>

        <div className="mt-12 grid items-start gap-8 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <section
            aria-labelledby="company-card-title"
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:sticky lg:top-24"
          >
            <Logo className="h-11" />
            <h2 id="company-card-title" className="mt-8 text-[1.25rem] font-[650] tracking-[-0.015em] text-ink">
              {site.name}
            </h2>
            <p className="mt-1 text-[0.9375rem] text-accent">{site.tagline}</p>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">{site.description}</p>

            <dl className="mt-7 divide-y divide-line border-y border-line text-[0.9375rem]">
              <div className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-muted">Website</dt>
                <dd className="text-right text-ink">{websiteLabel}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-muted">Location</dt>
                <dd className="text-right text-ink">India</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-muted">Products</dt>
                <dd className="text-right">
                  <Link href="/products" className="font-[560] text-accent underline-offset-4 hover:underline">
                    View all products
                  </Link>
                </dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="contact-form-title" className="rounded-2xl border border-line bg-raised p-6 sm:p-8">
            <h2 id="contact-form-title" className="type-h3">
              Send a message
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">All fields are required.</p>

            <div className="mt-7">
              {site.contact.formEnabled ? (
                <ContactForm />
              ) : (
                <Notice title="Current status" role="status">
                  <p>{CONTACT_STATUS}</p>
                </Notice>
              )}
            </div>

            <p className="mt-7 border-t border-line pt-5 text-[0.875rem] leading-relaxed text-muted">
              Payments are processed by Lemon Squeezy. Never share card details or passwords in a message.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
