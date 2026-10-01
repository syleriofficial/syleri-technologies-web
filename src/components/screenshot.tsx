import Image from "next/image";
import { getScreenshot, type ScreenshotKey } from "@/content/stockline-screenshots";

/**
 * A real Stockline screenshot, or — if the file has not been added yet —
 * an explicit placeholder that names the required asset. Never a mock UI.
 */
export function Screenshot({
  name,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className = "",
  caption,
}: {
  name: ScreenshotKey;
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
}) {
  const shot = getScreenshot(name);

  return (
    <figure className={className}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
        {shot.available ? (
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        ) : (
          <div
            role="img"
            aria-label={`Screenshot not yet available: ${shot.brief}`}
            className="absolute inset-3 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong p-4 text-center"
          >
            <span className="text-[0.9375rem] font-[600] text-ink-soft">Screenshot pending</span>
            <span className="max-w-[28ch] text-[0.875rem] leading-snug text-muted">{shot.brief}</span>
            <code className="mt-1 hidden max-w-full truncate rounded bg-raised px-2 py-1 text-[0.75rem] text-muted sm:block">
              public{shot.src}
            </code>
          </div>
        )}
      </div>
      {caption ? <figcaption className="mt-3 text-[0.875rem] text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
