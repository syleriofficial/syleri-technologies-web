import { getImageProps } from "next/image";
import type { ReactNode } from "react";
import type { ProductMedia } from "@/content/products";
import { mediaExists } from "@/lib/media";

/** Below 640px a figure shows its `mobile` crop, when the media has one. */
const MOBILE_QUERY = "(max-width: 639px)";
/** Phone-width rendering of a crop: the viewport minus the 20px gutters. */
const MOBILE_SIZES = "calc(100vw - 2.5rem)";

/**
 * A real screenshot rendered with art direction: the full capture from 640px
 * up and, on phones, a readable crop of the same screen. Both come from
 * next/image, so they are resized and served as AVIF/WebP.
 */
function Picture({
  media,
  sizes,
  eager = false,
  className = "",
  imgClassName = "",
}: {
  media: ProductMedia;
  sizes: string;
  eager?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const width = media.width ?? 1600;
  const height = media.height ?? 1000;
  const loading = eager ? "eager" : "lazy";
  const { props: img } = getImageProps({
    src: media.src,
    alt: media.alt,
    width,
    height,
    sizes,
    loading,
    // Screenshots never block the headline: the text paints first.
    fetchPriority: eager ? "auto" : "low",
  });
  const mobile = media.mobile;
  const mobileSrc = mobile
    ? getImageProps({
        src: mobile.src,
        alt: mobile.alt,
        width: mobile.width ?? width,
        height: mobile.height ?? height,
        sizes: MOBILE_SIZES,
      }).props
    : null;

  return (
    <picture className={className}>
      {mobile && mobileSrc ? (
        <source
          media={MOBILE_QUERY}
          srcSet={mobileSrc.srcSet}
          sizes={mobileSrc.sizes}
          width={mobile.width}
          height={mobile.height}
        />
      ) : null}
      <img {...img} alt={media.alt} className={`block h-auto w-full ${imgClassName}`} />
    </picture>
  );
}

function Pending({ media }: { media: ProductMedia }) {
  return (
    <div
      role="img"
      aria-label={`Image not yet available: ${media.brief}`}
      className="flex aspect-[16/10] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong p-4 text-center"
    >
      <span className="text-[0.9375rem] font-semibold text-ink-soft">Screenshot pending</span>
      <span className="max-w-[28ch] text-[0.875rem] leading-snug text-muted">{media.brief}</span>
    </div>
  );
}

/** "Fig. 02  Dashboard · light" — the mono caption placed above every screenshot. */
export function FigureCaption({
  index,
  children,
  tone = "page",
  aside,
}: {
  index?: string;
  children: ReactNode;
  tone?: "page" | "band";
  /** Right-hand note or link on the caption line. */
  aside?: ReactNode;
}) {
  const fig = index ? (
    <>
      <span className={tone === "band" ? "text-band-accent" : "text-accent"}>Fig. {index}</span>
      <span aria-hidden="true">&ensp;</span>
    </>
  ) : null;
  if (!aside) {
    return (
      <figcaption className={`type-label mb-3 ${tone === "band" ? "text-band-ink" : ""}`}>
        {fig}
        {children}
      </figcaption>
    );
  }
  return (
    <figcaption className="type-label flex flex-col gap-1 pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:pb-5">
      <span className={tone === "band" ? "text-band-ink" : ""}>
        {fig}
        {children}
      </span>
      <span className={tone === "band" ? "text-band-muted" : ""}>{aside}</span>
    </figcaption>
  );
}

/**
 * A captioned product screenshot on the page background. With `mediaDark`,
 * the dark-theme capture replaces it in dark mode (only the visible one is
 * fetched).
 */
export function Figure({
  media,
  mediaDark,
  index,
  caption,
  sizes,
  eager = false,
  className = "",
}: {
  media: ProductMedia;
  mediaDark?: ProductMedia;
  index?: string;
  caption: ReactNode;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  const frame = "overflow-hidden rounded-lg border border-line";
  return (
    <figure className={className}>
      <FigureCaption index={index}>{caption}</FigureCaption>
      {mediaExists(media) ? (
        <>
          <Picture media={media} sizes={sizes} eager={eager} className={`${frame} ${mediaDark ? "block dark:hidden" : "block"}`} />
          {mediaDark && mediaExists(mediaDark) ? (
            <Picture media={mediaDark} sizes={sizes} className={`${frame} hidden dark:block`} />
          ) : null}
        </>
      ) : (
        <Pending media={media} />
      )}
    </figure>
  );
}

/**
 * The figure band: the page's one deep-navy section, holding its main
 * product screenshot. The screenshot sits flush with the band's lower edge.
 */
export function FigureBand({
  media,
  index,
  caption,
  aside,
  label,
  eager = false,
}: {
  media: ProductMedia;
  index: string;
  caption: ReactNode;
  /** Right-hand note or link on the caption line. */
  aside?: ReactNode;
  /** Accessible name for the band region. */
  label: string;
  eager?: boolean;
}) {
  return (
    <section aria-label={label} className="bg-band">
      <div className="mx-auto w-full max-w-[76rem] px-5 pt-10 sm:px-8 sm:pt-14">
        <figure>
          <FigureCaption index={index} tone="band" aside={aside}>
            {caption}
          </FigureCaption>
          {mediaExists(media) ? (
            <Picture
              media={media}
              eager={eager}
              sizes="(min-width: 1216px) 1152px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
              className="block overflow-hidden rounded-t-[0.625rem] border border-b-0 border-band-line"
            />
          ) : (
            <Pending media={media} />
          )}
        </figure>
      </div>
    </section>
  );
}
