import Image from "next/image";
import type { ProductMedia } from "@/content/products";
import { mediaExists } from "@/lib/media";

/**
 * A real product image, or — if the file has not been added yet — an
 * explicit placeholder naming the required asset. Never a mock UI.
 */
export function ProductImage({
  media,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className = "",
  caption,
}: {
  media: ProductMedia;
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
}) {
  const available = mediaExists(media);

  return (
    <figure className={className}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface">
        {available ? (
          <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        ) : (
          <div
            role="img"
            aria-label={`Image not yet available: ${media.brief}`}
            className="absolute inset-3 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong p-4 text-center"
          >
            <span className="text-[0.9375rem] font-semibold text-ink-soft">Screenshot pending</span>
            <span className="max-w-[28ch] text-[0.875rem] leading-snug text-muted">{media.brief}</span>
            <code className="mt-1 hidden max-w-full truncate rounded bg-raised px-2 py-1 text-[0.75rem] text-muted sm:block">
              public{media.src}
            </code>
          </div>
        )}
      </div>
      {caption ? <figcaption className="mt-3 text-[0.875rem] text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
