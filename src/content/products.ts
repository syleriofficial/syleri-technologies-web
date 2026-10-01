/**
 * Product catalog.
 *
 * To add a product: append an entry to `products`. The home page,
 * /products directory, footer, sitemap and developer hub all read from
 * this list, so no layout changes are needed. Give a product a dedicated
 * page by creating `src/app/products/<slug>/page.tsx`.
 */

export type ProductStatus = "available" | "in-development" | "retired";

export type Product = {
  slug: string;
  name: string;
  category: string;
  /** One-line positioning statement, shown under the name. */
  subtitle: string;
  /** Short paragraph used on cards and in the directory. */
  summary: string;
  version: string;
  status: ProductStatus;
  /** Path of the product page on this site. */
  href: string;
  demoUrl?: string;
  checkoutUrl?: string;
  price?: {
    currency: "USD";
    amount: number;
    regularAmount?: number;
    label: string;
  };
  technology: string[];
  /** Whether the product belongs in the developer hub. */
  forDevelopers: boolean;
};

export const STOCKLINE_CHECKOUT_URL =
  "https://syleri-technologies.lemonsqueezy.com/checkout/buy/58a0a32e-641c-4e39-869b-2a687c791ccb";
export const STOCKLINE_DEMO_URL = "https://stockline-demo.vercel.app/";

export const stockline: Product = {
  slug: "stockline",
  name: "Stockline",
  category: "Developer Tools",
  subtitle: "POS & Inventory Management Dashboard for Next.js",
  summary:
    "A production-quality frontend starter kit for building retail, inventory, warehouse, purchasing, sales and operational software.",
  version: "1.0.0",
  status: "available",
  href: "/products/stockline",
  demoUrl: STOCKLINE_DEMO_URL,
  checkoutUrl: STOCKLINE_CHECKOUT_URL,
  price: {
    currency: "USD",
    amount: 49,
    regularAmount: 69,
    label: "$49 launch price",
  },
  technology: ["Next.js 16", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Recharts", "Lucide"],
  forDevelopers: true,
};

export const products: Product[] = [stockline];

/** Short description per category, shown on /products. Add one per new category. */
export const categoryDescriptions: Record<string, string> = {
  "Developer Tools": "Source-code products that give engineering teams and agencies a working foundation to build on.",
};

export const statusLabel: Record<ProductStatus, string> = {
  available: "Available",
  "in-development": "In development",
  retired: "Retired",
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
