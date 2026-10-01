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

  technology: string[];
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

  seo: { title: string; description: string };
  /** Schema.org Product fields. Only factual values. */
  schema: { category: string; description: string; sku?: string };
};
