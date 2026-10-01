/**
 * Catalog taxonomy shared by every product.
 *
 * - `categories` group products on /products (order here = display order).
 * - `focusAreas` are the broad areas shown in "What Syleri Technologies
 *   builds" on the home page; products opt in via `product.areas`.
 *
 * Add a category or area here once; products then reference it by id.
 */

export const categories = [
  {
    id: "developer-tools",
    name: "Developer Tools",
    description: "Source-code products that give engineering teams and agencies a working foundation to build on.",
  },
] as const satisfies readonly { id: string; name: string; description: string }[];

export type CategoryId = (typeof categories)[number]["id"];

export const focusAreas = [
  {
    id: "developer-products",
    title: "Developer products",
    body: "Starter kits, components and tools that give engineering teams a working, well-structured foundation instead of a blank repository.",
  },
  {
    id: "operational-software",
    title: "Operational software",
    body: "Software for the day-to-day work of running a business — selling, stocking, purchasing and reporting — where clarity matters more than novelty.",
  },
] as const satisfies readonly { id: string; title: string; body: string }[];

export type FocusAreaId = (typeof focusAreas)[number]["id"];

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}
