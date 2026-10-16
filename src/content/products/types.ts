import type { CategoryId, FocusAreaId } from "../catalog";

export type ProductStatus = "available" | "in-development" | "retired";

/**
 * A product image. `src` is a path under /public. Only real product
 * screenshots or artwork may be referenced; if the file is missing the site
 * renders a labelled "pending" frame using `brief`, never a mock.
 */
export type ProductMedia = {
  src: string;
  alt: string;
  /** What the image must show. Used for the placeholder and asset docs. */
  brief: string;
  /** Intrinsic pixel size. Lets large images reserve their space (no layout shift). */
  width?: number;
  height?: number;
  /**
   * A crop of the same real screen for narrow viewports (under 640px), so the
   * interface stays readable on a phone instead of shrinking to fit.
   */
  mobile?: ProductMedia;
};

/**
 * Home page section for the lead featured product: a factual heading, one or
 * two sentences, and one real screenshot (with an optional dark-theme
 * counterpart).
 */
export type ProductShowcase = {
  /** Section heading, e.g. what the product gives you. */
  title: string;
  /** One or two factual sentences under the heading. */
  lead: string;
  /** The full screenshot this section is about (also used in structured data). */
  image: ProductMedia;
  /** What the home page shows: a readable crop of `image`, if different. */
  figure?: ProductMedia;
  /** Dark-theme counterpart of `figure` (or `image`); shown in dark mode. */
  figureDark?: ProductMedia;
  /** Caption shown above the screenshot. */
  caption: string;
};

/**
 * The single structured record that describes a product everywhere on the
 * site: home page, /products, footer, developer hub, updates, sitemap,
 * metadata and structured data.
 */
export type Product = {
  /** URL slug. The product lives at /products/<slug>. */
  slug: string;
  name: string;
  category: CategoryId;
  /**
   * What form the product takes, in plain words — e.g. "Frontend starter kit",
   * "Web application", "Desktop app", "Library", "API". Lets the catalog hold
   * any kind of product, not only developer templates.
   */
  kind: string;
  /** One-line positioning statement shown under the name. */
  subtitle: string;
  /** Short paragraph used on cards, rows and the template page. */
  summary: string;
  version: string;
  status: ProductStatus;

  /**
   * "custom": a hand-built page exists at src/app/products/<slug>/page.tsx.
   * "template": the shared product page template renders it from this record.
   */
  page: "custom" | "template";

  /** Highlight on the home page and at the top of its category. */
  featured?: boolean;
  /** Home page "What we build" areas this product belongs to. */
  areas: FocusAreaId[];
  /** Listed in the developer hub and the footer's Developers column. */
  forDevelopers: boolean;

  /** Technologies the product is built with. Shown for developer-facing products; optional otherwise. */
  technology?: string[];
  /** Short stack summary for fact rows, e.g. "Next.js 16 · TypeScript". */
  stackSummary?: string;
  /**
   * Up to ~6 factual feature highlights. Rendered by the shared product
   * page template; custom pages may ignore them.
   */
  highlights?: { title: string; body: string }[];
  demoUrl?: string;
  /** External checkout. Opens in the same tab. */
  checkoutUrl?: string;
  price?: {
    currency: "USD";
    amount: number;
    regularAmount?: number;
    /** Short display label, e.g. "$49 launch price". */
    label: string;
    /** Name of what is purchased, e.g. "Stockline Standard License". */
    offerName: string;
  };
  license?: {
    name: string;
    /** One-line plain-language scope. */
    summary: string;
  };
  /** Product documentation. Without `url`, `note` explains how to get it. */
  docs?: { url?: string; note: string };

  /** Primary image: home feature, /products, template page. */
  cover?: ProductMedia;
  /** Large home page presentation when this product leads the featured products. */
  showcase?: ProductShowcase;

  seo: { title: string; description: string };
  /** Schema.org Product fields. Only factual values. */
  schema: { category: string; description: string; sku?: string };
};
