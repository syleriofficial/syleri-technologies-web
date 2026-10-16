import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { ProductImage } from "@/components/product-image";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { stockline } from "@/content/products/stockline";
import { stocklineMedia as media } from "@/content/products/stockline/media";
import { audiences, disclosureExclusions, faqs, included, modules, pricingIncludes } from "@/content/products/stockline/sales";
import { productMetadata } from "@/lib/metadata";
import { productBreadcrumb, productSchema } from "@/lib/schema";

export const metadata = productMetadata(stockline);

const CHECKOUT = stockline.checkoutUrl!;
const DEMO = stockline.demoUrl!;
// Prices come from the product record so the page, structured data and
// /products can never disagree.
const PRICE = `$${stockline.price!.amount}`;
const REGULAR_PRICE = stockline.price!.regularAmount ? `$${stockline.price!.regularAmount}` : null;
const PURCHASE_NOTE = "One-time purchase · Standard License · Source code included";

const jumpLinks = [
  { href: "#pos", label: "POS" },
  { href: "#modules", label: "Modules" },
  { href: "#developer-experience", label: "Developer experience" },
  { href: "#frontend-only", label: "What's not included" },
  { href: "#pricing", label: "Pricing" },
  { href: "#license", label: "License" },
  { href: "#faq", label: "FAQ" },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent">
      <path d="m3 8.5 3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-1 size-4 shrink-0 text-notice-ink">
      <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function StocklinePage() {
  return (
    <>
      <JsonLd data={[productSchema(stockline), productBreadcrumb(stockline)]} />

      {/* Hero */}
      <section aria-labelledby="stockline-title">
        <Container className="pb-12 pt-12 sm:pb-16 sm:pt-20">
          <nav aria-label="Breadcrumb" className="text-[0.875rem] text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <TextLink href="/products" className="text-muted">
                  Products
                </TextLink>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-soft">
                Stockline
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <p className="text-[0.9375rem] font-[560] text-accent">
                Stockline v{stockline.version}
              </p>
              <h1 id="stockline-title" className="type-display mt-4 max-w-[16ch]">
                POS & Inventory Management Dashboard for Next.js
              </h1>
            </div>
            <div className="lg:pt-10">
              <p className="type-lead">
                Build a polished retail, inventory, warehouse, purchasing, and sales application without starting the
                frontend from scratch.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Stockline is a production-quality Next.js + TypeScript frontend starter kit with POS workflows, inventory
                management, purchasing, sales, reports, roles, settings, and reusable UI components.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={CHECKOUT} size="lg">
                  Get Stockline — {PRICE}
                </ButtonLink>
                <ButtonLink href={DEMO} size="lg" variant="secondary" newTab>
                  View Live Demo
                </ButtonLink>
              </div>
              <p className="mt-4 text-[0.9375rem] text-muted">{PURCHASE_NOTE}</p>
              <p className="mt-6 border-l-2 border-notice-line pl-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                Stockline is a frontend starter kit. It does not include a backend, database or payment processing.{" "}
                <TextLink href="#frontend-only">See what&rsquo;s not included</TextLink>
              </p>
            </div>
          </div>
        </Container>

        <nav aria-label="On this page" className="border-y border-line">
          <Container>
            <ul className="-mx-2 flex gap-1 overflow-x-auto py-2 text-[0.9375rem] [scrollbar-width:none]">
              {jumpLinks.map((l) => (
                <li key={l.href} className="shrink-0">
                  <a href={l.href} className="inline-flex h-9 items-center rounded-lg px-3 text-muted hover:bg-surface hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      </section>

      {/* 1. POS terminal */}
      <Section id="pos" labelledBy="pos-title" tone="surface">
        <Container>
          <SectionHeading
            id="pos-title"
            title="POS terminal"
            intro="A point-of-sale interface for building a cart and working through a sale — the starting point for counter, retail and quick-service workflows that you connect to your own backend and payment provider."
          />
          <ProductImage media={media.pos} priority className="mt-10" sizes="(min-width: 1216px) 1152px, 100vw" />
        </Container>
      </Section>

      {/* 2. Dashboard */}
      <Section id="dashboard" labelledBy="dashboard-title">
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <SectionHeading
            id="dashboard-title"
            title="Dashboard"
            intro="An overview screen with charts built on Recharts, giving your users a clear first view of their operation."
          />
          <ProductImage media={media.dashboard} sizes="(min-width: 1024px) 66vw, 100vw" />
        </Container>
      </Section>

      {/* 3–11. Modules */}
      <Section id="modules" labelledBy="modules-title" tone="surface">
        <Container>
          <SectionHeading
            id="modules-title"
            title="Every screen an inventory business runs on"
            intro={
              <>
                Stockline 1.0.0 includes interface screens for each of these areas, populated with sample data. You can
                open every one in the{" "}
                <TextLink href={DEMO} newTab>
                  live demo
                </TextLink>
                .
              </>
            }
          />
          <ul className="mt-12 border-t border-line">
            {modules.map((m) => (
              <li
                key={m.id}
                id={m.id}
                className="grid scroll-mt-24 gap-6 border-b border-line py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12"
              >
                <div>
                  <h3 className="type-h3">{m.name}</h3>
                  <p className="mt-2 max-w-[46ch] leading-relaxed text-muted">{m.description}</p>
                </div>
                {m.media ? <ProductImage media={m.media} sizes="(min-width: 768px) 55vw, 100vw" /> : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 12. Themes */}
      <Section id="themes" labelledBy="themes-title">
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-14">
          <ProductImage media={media.dark} sizes="(min-width: 1024px) 66vw, 100vw" className="order-2 lg:order-1" />
          <SectionHeading
            id="themes-title"
            title="Light and dark themes"
            intro="Both themes are built into the interface, so the application looks considered whichever your users prefer."
            className="order-1 lg:order-2"
          />
        </Container>
      </Section>

      {/* 13. Developer experience */}
      <Section id="developer-experience" labelledBy="dx-title" tone="surface">
        <Container>
          <SectionHeading
            id="dx-title"
            title="Developer experience"
            intro="A modern, widely used stack, typed end to end, with the UI split into reusable components you can extend."
          />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Next.js 16", "Built on the current major version of Next.js."],
              ["React", "Component-based UI throughout."],
              ["TypeScript", "Typed source for safer changes as you extend the project."],
              ["Tailwind CSS", "Utility-first styling that is straightforward to adapt to your brand."],
              ["Radix UI", "Interface primitives from Radix UI underpin interactive components."],
              ["Recharts & Lucide", "Recharts for dashboard and report charts; Lucide for icons."],
            ].map(([term, desc]) => (
              <div key={term} className="bg-raised p-6">
                <dt className="font-[620] text-ink">{term}</dt>
                <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{desc}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 14. What's included */}
      <Section id="included" labelledBy="included-title">
        <Container>
          <SectionHeading id="included-title" title="What's included" />
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
              <li key={item.title} className="flex gap-3">
                <CheckIcon />
                <div>
                  <h3 className="font-[620] text-ink">{item.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 15. Frontend-only disclosure */}
      <section id="frontend-only" aria-labelledby="disclosure-title" className="scroll-mt-20 pb-16 sm:pb-24">
        <Container>
          <div className="rounded-2xl border border-notice-line bg-notice p-6 text-notice-ink sm:p-10">
            <h2 id="disclosure-title" className="type-h2 text-current">
              Stockline v1.0.0 is a frontend starter kit
            </h2>
            <p className="mt-4 max-w-[60ch] leading-relaxed">
              It gives you the complete user interface, shown with sample data. It does not include:
            </p>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {disclosureExclusions.map((x) => (
                <li key={x} className="flex gap-2.5">
                  <CrossIcon />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[60ch] text-[0.9375rem] leading-relaxed">
              To run Stockline as a live business system, you connect it to your own backend, database, authentication
              and payment provider.
            </p>
          </div>
        </Container>
      </section>

      {/* 16. Who it's for */}
      <Section id="audience" labelledBy="audience-title" tone="surface">
        <Container>
          <SectionHeading id="audience-title" title="Who it's for" />
          <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {audiences.map((a) => (
              <div key={a.title} className="border-t-2 border-ink pt-5">
                <h3 className="text-[1.0625rem] font-[640] tracking-[-0.01em]">{a.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{a.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-[64ch] text-[0.9375rem] leading-relaxed text-muted">
            Stockline is not a ready-to-run business system. If you need inventory or POS software that works out of the
            box without development work, it is not the right fit.
          </p>
        </Container>
      </Section>

      {/* 17. Pricing */}
      <Section id="pricing" labelledBy="pricing-title">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading
            id="pricing-title"
            title="Pricing"
            intro="One license, one price, paid once. Checkout is handled by Lemon Squeezy."
          />
          <div className="rounded-2xl border border-line-strong bg-raised p-6 sm:p-8">
            <h3 className="text-[1.0625rem] font-[620]">Stockline Standard License</h3>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[3rem] font-[700] leading-none tracking-[-0.04em] tabular-nums">{PRICE}</span>
              {REGULAR_PRICE ? (
                <span className="text-muted">
                  launch price · <span className="line-through">{REGULAR_PRICE}</span>
                  <span className="sr-only"> regular price</span>
                  <span aria-hidden="true"> regular</span>
                </span>
              ) : null}
            </p>
            <ul className="mt-6 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-2">
              {pricingIncludes.map((item) => (
                <li key={item} className="flex gap-2.5 text-[0.9375rem] text-ink-soft">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={CHECKOUT} size="lg">
                Get Stockline — {PRICE}
              </ButtonLink>
              <ButtonLink href={DEMO} size="lg" variant="secondary" newTab>
                View Live Demo
              </ButtonLink>
            </div>
            <p className="mt-4 text-[0.875rem] text-muted">{PURCHASE_NOTE}</p>
          </div>
        </Container>
      </Section>

      {/* 18. License */}
      <Section id="license" labelledBy="license-title" tone="surface">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading id="license-title" title="License" />
          <div className="max-w-[60ch] leading-relaxed text-ink-soft">
            <p>
              Stockline is sold under the <strong className="font-[620] text-ink">Standard License</strong>. Each license
              covers <strong className="font-[620] text-ink">one commercial end product or one client project</strong>.
            </p>
            <ul className="mt-5 space-y-2.5">
              <li className="flex gap-2.5">
                <CheckIcon />
                Commercial use in that one end product or client project
              </li>
              <li className="flex gap-2.5">
                <CheckIcon />
                Full access to the source code, which you may customize
              </li>
            </ul>
            <p className="mt-5 text-[0.9375rem] text-muted">
              This is a summary. The license terms supplied with Stockline govern your use of the product. Planning more
              than one product or client project? <TextLink href="/contact">Contact us</TextLink> before purchasing.
            </p>
          </div>
        </Container>
      </Section>

      {/* 19. FAQ */}
      <Section id="faq" labelledBy="faq-title">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading id="faq-title" title="Questions" />
          <Faq items={faqs} />
        </Container>
      </Section>

      {/* 20. Final CTA */}
      <section aria-labelledby="final-title" className="border-t border-line bg-surface">
        <Container className="py-20 sm:py-28">
          <h2 id="final-title" className="type-title max-w-[22ch]">
            Start your POS and inventory app from a finished interface.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={CHECKOUT} size="lg">
              Get Stockline — {PRICE}
            </ButtonLink>
            <ButtonLink href={DEMO} size="lg" variant="secondary" newTab>
              View Live Demo
            </ButtonLink>
          </div>
          <p className="mt-4 text-[0.9375rem] text-muted">{PURCHASE_NOTE}</p>
        </Container>
      </section>
    </>
  );
}
