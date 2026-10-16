/**
 * Catalog taxonomy shared by every product.
 *
 * - `categories` group products on /products (order here = display order).
 *   A category only appears on the site once it contains a product.
 * - `focusAreas` are the broad areas of work shown in "What we build" on the
 *   home page and the company page. Products opt in via `product.areas`.
 *   An area describes what Syleri Technologies works on; it never implies a
 *   product exists — only real products are listed under it.
 *
 * Add a category or area here once; products then reference it by id.
 */

export const categories = [
  {
    id: "developer-tools",
    name: "Developer Tools",
    description: "Products for engineering teams: foundations, components and tooling to build software on.",
  },
] as const satisfies readonly { id: string; name: string; description: string }[];

export type CategoryId = (typeof categories)[number]["id"];

export const focusAreas = [
  {
    id: "business-operations",
    title: "Business software",
    body: "Selling, stock, purchasing and reporting — the daily work of running a shop or a warehouse.",
  },
  {
    id: "developer-tools",
    title: "Developer foundations",
    body: "Typed, documented starting points, so a team builds the product instead of the scaffolding.",
  },
] as const satisfies readonly { id: string; title: string; body: string }[];

export type FocusAreaId = (typeof focusAreas)[number]["id"];

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}
