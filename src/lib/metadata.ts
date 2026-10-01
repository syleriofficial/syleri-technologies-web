import type { Metadata } from "next";
import { productPath, type Product } from "@/content/products";
import { site } from "@/content/site";

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Syleri Technologies — Software Products & Developer Tools",
};

/**
 * Builds consistent per-page metadata: title, description, canonical URL,
 * Open Graph and Twitter cards. Open Graph images come from the route's
 * `opengraph-image` file (or the root one) automatically.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noindex = false,
  ogImage = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of applying the "— Syleri Technologies" template. */
  absoluteTitle?: boolean;
  noindex?: boolean;
  /**
   * Social image. Defaults to the site-wide card. Pass `null` when the route
   * has its own `opengraph-image` file, which Next.js applies automatically.
   */
  ogImage?: { url: string; width: number; height: number; alt: string } | null;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — ${site.name}`;
  const images = ogImage ? [ogImage] : undefined;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: site.locale,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(images ? { images } : {}),
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/**
 * Metadata for a product page, from its record. The product's own
 * opengraph-image route supplies the social image.
 */
export function productMetadata(p: Product): Metadata {
  return pageMetadata({
    title: p.seo.title,
    description: p.seo.description,
    path: productPath(p),
    absoluteTitle: true,
    ogImage: null,
  });
}
