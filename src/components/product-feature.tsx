import Link from "next/link";
import type { Product } from "@/content/products";
import { StatusMark } from "./product-ledger";
import { Screenshot } from "./screenshot";
import { ButtonLink } from "./ui/button-link";
import type { ScreenshotKey } from "@/content/stockline-screenshots";

/**
 * Featured product panel. Generic over Product so future products reuse it;
 * `shot` is optional because not every product will have screenshots.
 */
export function ProductFeature({
  product,
  headingLevel = "h3",
  shot,
  primaryLabel,
  showFacts = false,
}: {
  product: Product;
  headingLevel?: "h2" | "h3";
  shot?: ScreenshotKey;
  primaryLabel: string;
  showFacts?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-raised">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <p className="text-[0.9375rem] text-muted">{product.category}</p>
          <Heading className="mt-2 text-[2rem] font-[680] leading-tight tracking-[-0.03em]">
            <Link href={product.href} className="hover:text-accent">
              {product.name}
            </Link>
          </Heading>
          <p className="mt-1 text-lg font-[560] leading-snug tracking-[-0.01em] text-ink-soft">{product.subtitle}</p>
          <p className="mt-4 leading-relaxed text-muted">{product.summary}</p>

          {showFacts ? (
            <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line py-4 text-[0.9375rem]">
              <div>
                <dt className="text-[0.8125rem] text-muted">Version</dt>
                <dd className="mt-0.5 text-ink">{product.version}</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] text-muted">Status</dt>
                <dd className="mt-0.5">
                  <StatusMark status={product.status} />
                </dd>
              </div>
              {product.price ? (
                <div>
                  <dt className="text-[0.8125rem] text-muted">Price</dt>
                  <dd className="mt-0.5 text-ink">{product.price.label}</dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`${product.name} technology`}>
              {product.technology.map((t) => (
                <li key={t} className="rounded-md border border-line px-2 py-0.5 text-[0.8125rem] text-ink-soft">
                  {t}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
            <ButtonLink href={product.href}>{primaryLabel}</ButtonLink>
            {product.demoUrl ? (
              <ButtonLink href={product.demoUrl} variant="secondary" newTab>
                Live demo
              </ButtonLink>
            ) : null}
          </div>
        </div>
        {shot ? (
          <div className="border-t border-line bg-surface p-4 sm:p-6 lg:border-l lg:border-t-0">
            <Screenshot name={shot} sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
        ) : null}
      </div>
    </article>
  );
}
