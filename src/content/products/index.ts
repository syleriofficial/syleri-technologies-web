/**
 * Product registry.
 *
 * To add a product:
 *   1. Create src/content/products/<slug>/index.ts exporting a `Product`.
 *   2. Import it below and add it to `registry`.
 *   3. Either set `page: "template"` (the shared product page renders it), or
 *      set `page: "custom"` and build src/app/products/<slug>/page.tsx.
 * Everything else — home page, /products, footer, developer hub, updates,
 * sitemap, metadata, structured data — reads from this registry.
 * See docs/ADDING-A-PRODUCT.md.
 */

import { categories, type CategoryId, type FocusAreaId } from "../catalog";
import { stockline } from "./stockline";
import type { Product, ProductStatus } from "./types";

export type { Product, ProductMedia, ProductStatus } from "./types";

/** Registry order is the default display order within a category. */
const registry: Product[] = [stockline];

const statusRank: Record<ProductStatus, number> = { available: 0, "in-development": 1, retired: 2 };

/** All public products: featured first, then by status, then registry order. Retired products are hidden. */
export const products: Product[] = registry
  .map((p, i) => ({ p, i }))
  .filter(({ p }) => p.status !== "retired")
  .sort(
    (a, b) =>
      Number(!!b.p.featured) - Number(!!a.p.featured) || statusRank[a.p.status] - statusRank[b.p.status] || a.i - b.i,
  )
  .map(({ p }) => p);

/** Every record, including retired ones (used for validation and old update links). */
export const allProducts: readonly Product[] = registry;

export const statusLabel: Record<ProductStatus, string> = {
  available: "Available",
  "in-development": "In development",
  retired: "Retired",
};

export function productPath(p: Pick<Product, "slug">) {
  return `/products/${p.slug}`;
}

export function getProduct(slug: string) {
  return allProducts.find((p) => p.slug === slug);
}

/**
 * Products to highlight on the home page. Falls back to the first public
 * product so the section is never empty while at least one product exists.
 */
export function featuredProducts(limit = 3) {
  const featured = products.filter((p) => p.featured);
  return (featured.length ? featured : products.slice(0, 1)).slice(0, limit);
}

export function developerProducts() {
  return products.filter((p) => p.forDevelopers);
}

export function productsInArea(area: FocusAreaId) {
  return products.filter((p) => p.areas.includes(area));
}

/** Slugs rendered by the shared product page template (src/app/products/[slug]). */
export function templateSlugs() {
  return allProducts.filter((p) => p.page === "template" && p.status !== "retired").map((p) => ({ slug: p.slug }));
}

/** Categories that currently have at least one product, in catalog order. */
export function productsByCategory() {
  return categories
    .map((category) => ({ category, items: products.filter((p) => p.category === category.id) }))
    .filter((g) => g.items.length > 0);
}

export function categoryName(id: CategoryId) {
  return categories.find((c) => c.id === id)!.name;
}
