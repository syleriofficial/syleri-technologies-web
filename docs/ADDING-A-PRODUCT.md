# Adding a product

Every product is described by **one typed record**. The home page,
`/products`, footer, developer hub, updates, sitemap, metadata, Open Graph
images and structured data all read from that record — none of them need
editing when a product is added.

## 1. Create the record

Create `src/content/products/<slug>/index.ts`:

```ts
import type { Product } from "../types";

export const myProduct: Product = {
  slug: "my-product",              // URL: /products/my-product
  name: "My Product",
  category: "developer-tools",     // an id from src/content/catalog.ts
  kind: "Web application",         // what form it takes: app, starter kit, library, API…
  subtitle: "One-line positioning statement",
  pitch: "a … that …",              // optional: completes "Our first release is <name>, …" on the home page while it is the only product
  summary: "One or two factual sentences about what it is.",
  version: "1.0.0",
  status: "available",             // "available" | "in-development" | "retired"
  page: "template",                // "template" or "custom" (see step 3)
  featured: false,                 // true = highlighted on home + top of its category
  areas: ["business-operations"],  // ids from focusAreas in catalog.ts
  forDevelopers: false,            // true = listed in /developers with its demo and docs

  // Optional — include only what is real:
  technology: ["TypeScript"],      // shown for developer-facing products
  highlights: [{ title: "…", body: "…" }],  // feature sections on the template page
  demoUrl: "https://…",
  checkoutUrl: "https://…",        // requires price
  price: { currency: "USD", amount: 29, label: "$29", offerName: "My Product License" },
  license: { name: "Standard License", summary: "One end product." },
  docs: { url: "https://…", note: "" },
  cover: { src: "/products/my-product/cover.png", alt: "…", brief: "…", width: 2880, height: 1800 },
  // Optional on any media: mobile: { …a readable crop of the same real screen for phones… }

  seo: { title: "My Product — …", description: "…" },
  schema: { category: "…", description: "…" },
};
```

All types are in `src/content/products/types.ts`.

## 2. Register it

In `src/content/products/index.ts`, import the record and add it to
`registry`. Registry order is the display order within a category
(featured products come first, then available, then in development).

## 3. Choose a page

- **`page: "template"`** — the shared template at
  `src/app/products/[slug]/page.tsx` renders the product from its record
  (hero, CTAs, facts, cover image, details, latest release). No page code
  needed.
- **`page: "custom"`** — build a dedicated sales page at
  `src/app/products/<slug>/page.tsx` (see `src/app/products/stockline/`
  for the pattern). Put product-specific copy in
  `src/content/products/<slug>/` alongside the record. Use
  `productMetadata(product)`, `productSchema(product)` and
  `productBreadcrumb(product)` so SEO stays consistent, and add an
  `opengraph-image.tsx` that calls `productOgImage(product)`.

## 4. New category or focus area?

Add it once to `src/content/catalog.ts`. Categories only appear on
`/products` when they contain at least one product.

## 5. Announce it

Add a release entry to `src/content/updates.ts` with `productSlug` set.
Entries are shown newest first by date, wherever you add them. Product page
and demo links are attached automatically.

## Build-time checks

`npm run build` fails with a clear message if a record has a duplicate
slug, an unknown category or focus area, a non-https external URL, a
checkout without a price, or a `page` value that doesn't match whether a
custom page exists.

## How the layout scales

Tested with 1, 5, 10, 20 and 50 products across six categories.

| Products | Home | /products |
|----------|------|-----------|
| 1 | Hero names the product (from `pitch`) and links to it and its demo; the lead product's screen, facts and figure | One entry with screenshot; no category headings |
| 2+ | Hero says "Explore products"; the lead (first featured) product keeps its section; a "More from Syleri Technologies" index lists up to 4 others, then "All N products" | Category headings and a jump list (with counts) once there are 2+ categories |
| Many | Same length as at 2: one lead section, at most 4 index rows, 3 latest releases and "All N updates" | Up to 2 featured entries per category with screenshots; up to 6 more as full rows; beyond that, a compact ruled index per category |

Section numbers on the home page follow the sections actually shown. The
"How we work" links point at the single product while there is one, and at
/products, /developers and /updates once there are more.

The footer lists up to 3 product names next to "Products". Demos and
documentation for every developer product are on `/developers`, which adds a
jump list once there are 2+ developer products. Retired products are hidden
from listings but their records remain for old update links.

## Where purchase buttons appear

Purchase buttons appear only on `/products` and on the product's own page,
never on the home page, which leads to the product page instead.

Do not add placeholder or future products to fill space — only real
products belong in the registry. Products are not limited to developer
tools: any kind of product fits the same record.
