import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
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
        <h1 className="type-title">Contact</h1>
        <p className="type-lead mt-5 max-w-[40ch]">Questions about our products, licensing or an order? Send us a message.</p>

        <div className="mt-12 grid items-start gap-12 border-t border-line pt-10 lg:mt-16 lg:grid-cols-12 lg:gap-x-8">
          <section aria-labelledby="company-details-title" className="lg:col-span-4">
            <h2 id="company-details-title" className="type-label">
              {site.name}
            </h2>
            <dl className="mt-4 border-t border-line text-[0.9375rem]">
              <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                <dt className="text-muted">Website</dt>
                <dd className="font-mono text-[0.875rem] text-ink">{websiteLabel}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                <dt className="text-muted">Location</dt>
                <dd className="text-ink">India</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                <dt className="text-muted">Products</dt>
                <dd>
                  <Link href="/products" className="font-medium text-accent hover:text-accent-hover">
                    View all products →
                  </Link>
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-[0.875rem] leading-relaxed text-muted">
              Payments are processed by Lemon Squeezy. Never share card details or passwords in a message.
            </p>
          </section>

          <section aria-labelledby="contact-form-title" className="lg:col-span-7 lg:col-start-6">
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
          </section>
        </div>
      </Container>
    </>
  );
}
