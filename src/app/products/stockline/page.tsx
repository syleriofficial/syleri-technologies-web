import { Faq } from "@/components/faq";
import { Figure, FigureBand } from "@/components/figure";
import { JsonLd } from "@/components/json-ld";
import { ArrowLink, ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container, FactsRow, IndexedSection, RuledRow } from "@/components/ui/layout";
import { stockline } from "@/content/products/stockline";
import { stocklineMedia as media } from "@/content/products/stockline/media";
import { audiences, disclosureExclusions, faqs, included, screenAreas } from "@/content/products/stockline/sales";
import { latestRelease } from "@/content/updates";
import { productMetadata } from "@/lib/metadata";
import { productBreadcrumb, productSchema } from "@/lib/schema";

export const metadata = productMetadata(stockline);

const CHECKOUT = stockline.checkoutUrl!;
const DEMO = stockline.demoUrl!;
// Prices come from the product record so the page, structured data and
// /products can never disagree.
const PRICE = `$${stockline.price!.amount}`;
const REGULAR_PRICE = stockline.price!.regularAmount ? `$${stockline.price!.regularAmount}` : null;
const RELEASE = latestRelease(stockline.slug);

/** Wide figures span the container; the 2-up pair takes half each from 768px. */
/**
 * Section ids from the previous version of this page. Links elsewhere may
 * still use them, so each one is kept as a zero-height anchor where that
 * content now lives.
 */
function LegacyAnchors({ ids }: { ids: string[] }) {
  return (
    <>
      {ids.map((id) => (
        <span key={id} id={id} aria-hidden="true" className="block scroll-mt-20" />
      ))}
    </>
  );
}

const WIDE_SIZES = "(min-width: 1216px) 1152px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)";
const HALF_SIZES = "(min-width: 1216px) 560px, (min-width: 768px) calc(50vw - 3rem), calc(100vw - 4rem)";

export default function StocklinePage() {
  return (
    <>
      <JsonLd data={[productSchema(stockline), productBreadcrumb(stockline)]} />

      {/* Hero */}
      <section aria-labelledby="stockline-title">
        <Container className="pb-12 pt-10 sm:pb-16 sm:pt-16">
          <nav aria-label="Breadcrumb" className="type-label">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <TextLink href="/products" className="text-muted">
                  Products
                </TextLink>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                Stockline
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
            <div className="lg:col-span-7">
              <h1 id="stockline-title" className="type-product">
                Stockline
              </h1>
              <p className="mt-5 max-w-[30ch] text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                A POS and inventory management dashboard for Next.js.
              </p>
              <p className="mt-5 max-w-[38rem] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
                Every screen of a retail and inventory application — point of sale, stock, purchasing, reports — ready to
                connect to your own backend.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="flex flex-col items-start gap-4">
                <ButtonLink href={CHECKOUT} size="lg">
                  Get Stockline — {PRICE}
                </ButtonLink>
                <ArrowLink href={DEMO} newTab>
                  Open the live demo
                </ArrowLink>
              </div>
              <p className="mt-6 max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink-soft">
                Stockline is a frontend starter kit. It does not include a backend, database or payment processing.{" "}
                <TextLink href="#not-included">What’s not included</TextLink>
              </p>
            </div>
          </div>

          <FactsRow
            className="mt-12 sm:mt-14"
            items={[
              { label: "Version", value: RELEASE?.date ? `${stockline.version} · ${RELEASE.date}` : stockline.version },
              { label: "Purchase", value: `One-time, ${PRICE}` },
              { label: "You get", value: "Full source code" },
              { label: "Stack", value: stockline.stackSummary ?? "Next.js" },
            ]}
          />
        </Container>
      </section>

      <LegacyAnchors ids={["pos"]} />
      <FigureBand
        media={media.pos}
        index="01"
        label="Stockline POS terminal screenshot"
        caption="POS terminal · a sale of seven items, $794.22"
        aside={
          <a href={DEMO} target="_blank" rel="noopener noreferrer" className="text-band-ink hover:text-white">
            Open this screen in the demo ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        }
      />

      {/* 01 Screens */}
      <LegacyAnchors ids={["dashboard", "modules", "themes"]} />
      <IndexedSection
        id="screens"
        index="01"
        label="Screens"
        title="Every area of the app, each one open in the demo."
        intro={<p>Populated with sample data so you can see how real records look. Light and dark themes are built in.</p>}
        rule={false}
        wide={
          <>
            <Figure
              className="mt-14"
              index="02"
              caption="Inventory overview · stock by warehouse, with on-hand, reserved and incoming"
              media={media.inventoryTable}
              sizes={WIDE_SIZES}
            />
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-8">
              <Figure index="03" caption="Dashboard · light" media={media.dashboardCards} sizes={HALF_SIZES} />
              <Figure index="04" caption="Dashboard · dark" media={media.dashboardCardsDark} sizes={HALF_SIZES} />
            </div>
            <div className="mt-16 grid lg:grid-cols-12 lg:gap-x-8">
              <table className="w-full border-collapse text-left lg:col-span-9 lg:col-start-4">
                <caption className="type-label pb-3 text-left">Every area in {stockline.version}</caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Area</th>
                    <th scope="col">What it covers</th>
                  </tr>
                </thead>
                <tbody>
                  {screenAreas.map((a) => (
                    <tr key={a.name} className="block border-t border-line py-3.5 last:border-b sm:table-row sm:py-0">
                      <th scope="row" className="block font-semibold text-ink sm:table-cell sm:w-[36%] sm:py-3.5 sm:pr-6 sm:align-top">
                        {a.name}
                      </th>
                      <td className="mt-0.5 block text-ink-soft sm:mt-0 sm:table-cell sm:py-3.5 sm:align-top">{a.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        }
      />

      {/* 02 Built with */}
      <LegacyAnchors ids={["developer-experience", "included"]} />
      <IndexedSection id="built-with" index="02" label="Built with" title="A stack you already know, typed end to end.">
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
          <dl className="border-t border-line">
            {[
              ["Framework", "Next.js 16"],
              ["Language", "TypeScript"],
              ["UI", "React · Radix UI"],
              ["Styling", "Tailwind CSS"],
              ["Charts · icons", "Recharts · Lucide"],
            ].map(([term, value]) => (
              <div key={term} className="flex items-baseline justify-between gap-6 border-b border-line py-3">
                <dt className="text-[0.9375rem] text-muted">{term}</dt>
                <dd className="text-right font-mono text-[0.875rem] text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h3 className="type-label pb-3">In the download</h3>
            <ul className="border-t border-line">
              {included.map((item) => (
                <li key={item} className="border-b border-line py-3 leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </IndexedSection>

      {/* 03 Not included */}
      <LegacyAnchors ids={["frontend-only"]} />
      <IndexedSection
        id="not-included"
        index="03"
        label="Not included"
        title="Stockline is the frontend. You bring the rest."
        intro={
          <p>
            Version {stockline.version} is a frontend starter kit: the complete user interface, shown with sample data. It
            does not include:
          </p>
        }
      >
        <ul className="mt-8 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
          {disclosureExclusions.map((x) => (
            <li key={x} className="border-b border-line py-3">
              {x}
            </li>
          ))}
        </ul>
        <p className="mt-7 max-w-[62ch] leading-relaxed text-ink-soft">
          To run Stockline as a live business system, connect it to your own backend, database, authentication and payment
          provider. If you need inventory or POS software that works out of the box without development work, Stockline
          isn’t the right fit.
        </p>
      </IndexedSection>

      {/* 04 Who it's for */}
      <IndexedSection id="audience" index="04" label="Who it’s for" hideTitle>
        <div className="border-t border-line">
          {audiences.map((a) => (
            <RuledRow key={a.title} title={a.title}>
              <p>{a.body}</p>
            </RuledRow>
          ))}
        </div>
      </IndexedSection>

      {/* 05 Price and license — the one place the license is stated */}
      <LegacyAnchors ids={["license"]} />
      <IndexedSection id="pricing" index="05" label="Price and license" hideTitle>
        <div className="grid gap-12 md:grid-cols-2 md:gap-12">
          <div>
            <p className="text-[4.5rem] font-semibold leading-[0.95] tracking-[-0.045em] tabular-nums sm:text-[5.5rem]">
              {PRICE}
            </p>
            <p className="type-label mt-4 text-[0.875rem]">
              Launch price
              {REGULAR_PRICE ? (
                <>
                  {" · "}
                  <s>{REGULAR_PRICE}</s>
                  <span className="sr-only"> regular price</span>
                  <span aria-hidden="true"> regular</span>
                </>
              ) : null}
              {" · "}paid once
            </p>
            <div className="mt-8">
              <ButtonLink href={CHECKOUT} size="lg">
                Get Stockline — {PRICE}
              </ButtonLink>
            </div>
            <p className="mt-4 text-[0.875rem] text-muted">Checkout is handled by Lemon Squeezy.</p>
          </div>
          <div className="md:pt-2">
            <h3 className="type-h3">{stockline.license!.name}</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Each license covers <strong className="font-semibold text-ink">one commercial end product or one client project</strong>.
              Commercial use in that product or project and full access to the source code, which you may customize, are
              included.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
              This is a summary. The license terms supplied with Stockline govern your use of the product. Planning more
              than one product or client project? <TextLink href="/contact">Contact us</TextLink> before purchasing.
            </p>
          </div>
        </div>
      </IndexedSection>

      {/* 06 Questions */}
      <IndexedSection id="faq" index="06" label="Questions" hideTitle>
        <Faq items={faqs} />
      </IndexedSection>
    </>
  );
}
