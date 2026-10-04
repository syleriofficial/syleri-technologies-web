import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/layout";
import { Notice } from "@/components/ui/notice";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Contact",
  description: "How to get in touch with Syleri Technologies about products, licensing and orders.",
  path: "/contact",
});

const topics = [
  { title: "Product questions", body: "Questions about a product's scope, technology or fit for your project before you buy." },
  { title: "Licensing", body: "Questions about a product license, including use beyond what a license covers." },
  { title: "Orders", body: "Help with an existing purchase made through Lemon Squeezy checkout." },
];

/** Shown while no secure contact form is configured. No email address is ever published. */
const CONTACT_STATUS = "Contact options are being finalized. Product customers can use the support channel provided with their purchase.";

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
        <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <h1 className="type-title">Contact</h1>
            <p className="type-lead mt-5 max-w-[44ch]">
              Questions about our products, licensing or an order? This is where to reach Syleri Technologies.
            </p>

            <div className="mt-10">
              {site.contact.formEnabled ? (
                <ContactForm />
              ) : (
                <Notice title="Current status" role="status">
                  <p>{CONTACT_STATUS}</p>
                </Notice>
              )}
            </div>
          </div>

          <section aria-labelledby="topics-title" className="lg:pt-3">
            <h2 id="topics-title" className="type-h3">
              What to get in touch about
            </h2>
            <ul className="mt-6 border-t border-line">
              {topics.map((t) => (
                <li key={t.title} className="border-b border-line py-5">
                  <h3 className="font-[620] text-ink">{t.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{t.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.875rem] leading-relaxed text-muted">
              Payments are processed by Lemon Squeezy. Never share card details or passwords outside the checkout page.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
