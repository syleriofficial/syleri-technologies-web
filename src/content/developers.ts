/**
 * Developer hub resources.
 *
 * Each product that is relevant to developers gets a group of resources.
 * A resource without an `href` is shown as "not publicly available" with
 * its `note` — never link to documentation that does not exist.
 */

import { STOCKLINE_DEMO_URL } from "./products";

export type DeveloperResource = {
  title: string;
  description: string;
  href?: string;
  external?: boolean;
  /** Shown when there is no public link. */
  note?: string;
};

export type DeveloperResourceGroup = {
  productSlug: string;
  productName: string;
  version: string;
  resources: DeveloperResource[];
};

export const developerResources: DeveloperResourceGroup[] = [
  {
    productSlug: "stockline",
    productName: "Stockline",
    version: "1.0.0",
    resources: [
      {
        title: "Stockline documentation",
        description: "Setup, project structure and customization guidance for the Stockline starter kit.",
        // CONFIGURATION NEEDED: add the public documentation URL once published.
        note: "Included with your purchase. A public online version has not been published yet.",
      },
      {
        title: "Live demo",
        description: "Explore the running Stockline interface with sample data in your browser.",
        href: STOCKLINE_DEMO_URL,
        external: true,
      },
      {
        title: "Product page",
        description: "Modules, technology, what's included, pricing and license details.",
        href: "/products/stockline",
      },
      {
        title: "Release notes",
        description: "What shipped in Stockline 1.0.0.",
        href: "/updates/stockline-1-0-0",
      },
    ],
  },
];
