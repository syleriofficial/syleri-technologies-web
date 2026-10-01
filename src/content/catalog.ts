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
    title: "Business operations",
    body: "Software for the everyday work of running a business — selling, stock, purchasing and reporting — where clarity and reliability matter more than novelty.",
  },
  {
    id: "developer-tools",
    title: "Developer tools",
    body: "Foundations and tooling that help engineering teams start from well-structured, typed, documented code instead of a blank repository.",
  },
] as const satisfies readonly { id: string; title: string; body: string }[];

export type FocusAreaId = (typeof focusAreas)[number]["id"];

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}
