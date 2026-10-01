import { JsonLd } from "@/components/json-ld";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/layout";
import { Notice } from "@/components/ui/notice";
import { STOCKLINE_DEMO_URL } from "@/content/products";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Contact",
  description: "How to get in touch with Syleri Technologies about products, licensing and orders.",
  path: "/contact",
});

const topics = [
  { title: "Product questions", body: "Questions about Stockline's scope, technology or fit for your project before you buy." },
  { title: "Licensing", body: "Questions about the Standard License, including use across more than one product or client project." },
  { title: "Orders", body: "Help with an existing purchase made through Lemon Squeezy checkout." },
];

export default function ContactPage() {
  const email = site.contact.email;

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
              Questions about our products, licensing or an order? Here is how to reach Syleri Technologies.
            </p>

            <div className="mt-10">
              {email ? (
                <div className="rounded-2xl border border-line bg-raised p-6 sm:p-8">
                  <h2 className="type-h3">Email</h2>
                  <p className="mt-2 text-muted">We read every message and reply by email.</p>
                  <p className="mt-5">
                    <ButtonLink href={`mailto:${email}`} size="lg">
                      {email}
                    </ButtonLink>
                  </p>
                </div>
              ) : (
                <Notice title="Contact channel not yet configured" tone="config" role="status">
                  <p>
                    A public contact address for Syleri Technologies has not been published yet. Until it is, there is no
                    working contact form on this site — we do not collect messages we cannot answer.
                  </p>
                  <p className="mt-2">
                    In the meantime, you can explore Stockline in the{" "}
                    <TextLink href={STOCKLINE_DEMO_URL} newTab>
                      live demo
                    </TextLink>{" "}
                    or read the <TextLink href="/products/stockline#faq">Stockline FAQ</TextLink>.
                  </p>
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
              Payments are processed by Lemon Squeezy. Never send card details or passwords by email.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
