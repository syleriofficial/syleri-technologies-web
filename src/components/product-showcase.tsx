import Image from "next/image";
import { productPath, type Product, type ProductMedia } from "@/content/products";
import { ButtonLink, ExternalIcon, TextLink } from "./ui/button-link";
import { Container } from "./ui/layout";

/** Rendered width of the showcase image: the container's content box (76rem minus 2 x 2rem padding). */
const SHOWCASE_SIZES = "(min-width: 1216px) 1152px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)";

function ShowcaseImage({ media, className }: { media: ProductMedia; className: string }) {
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width ?? 1600}
      height={media.height ?? 1000}
      sizes={SHOWCASE_SIZES}
      // Below the hero, so it loads lazily; the hidden theme's copy is never fetched.
      loading="lazy"
      className={`h-auto w-full ${className}`}
    />
  );
}

/**
 * Large home page presentation of the lead featured product: name,
 * positioning, actions, one real screenshot (theme-matched when a dark
 * capture exists) and up to three short capability notes. Renders only for
 * products that define `showcase`.
 */
export function ProductShowcase({ product, eyebrow }: { product: Product; eyebrow: string }) {
  const showcase = product.showcase;
  if (!showcase) return null;
  const { image, imageDark, points } = showcase;

  return (
    <section aria-labelledby="showcase-title" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="text-[0.9375rem] font-[560] text-muted">{eyebrow}</p>
          <TextLink href="/products" className="text-[0.9375rem]">
            All products
          </TextLink>
        </div>

        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-end lg:gap-16">
          <div>
            <h2 id="showcase-title" className="type-showcase">
              {product.name}
            </h2>
            <p className="mt-4 max-w-[30ch] text-[1.1875rem] font-[560] leading-snug tracking-[-0.01em] text-ink-soft sm:text-[1.3125rem]">
              {product.subtitle}
            </p>
          </div>
          <div>
            <p className="max-w-[50ch] text-[1.0625rem] leading-relaxed text-ink-soft">{showcase.lead}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href={productPath(product)} size="lg">
                Explore {product.name}
              </ButtonLink>
              {product.demoUrl ? (
                <TextLink href={product.demoUrl} newTab className="inline-flex items-center gap-1.5 font-[560]">
                  Try the live demo
                  <ExternalIcon />
                </TextLink>
              ) : null}
            </div>
          </div>
        </div>

        <figure className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface sm:mt-16">
          <ShowcaseImage media={image} className={imageDark ? "block dark:hidden" : "block"} />
          {imageDark ? <ShowcaseImage media={imageDark} className="hidden dark:block" /> : null}
        </figure>

        {points.length ? (
          <ul className="mt-10 grid gap-x-10 gap-y-6 sm:mt-12 sm:grid-cols-3">
            {points.map((p) => (
              <li key={p.title} className="border-t border-line pt-5">
                <h3 className="text-[1.0625rem] font-[620] tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
