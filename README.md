# syleri-technologies-web

Source for **syleritechnologies.com**, the corporate and product website of
Syleri Technologies.

> Not deployed. This repository is awaiting independent audit and approval.

## Stack

- Next.js 16.3 (App Router, static generation), React 19, TypeScript
- Tailwind CSS 4
- Self-hosted Schibsted Grotesk variable font (SIL OFL 1.1)
- No CMS, database, auth, analytics or backend. Checkout is handled by Lemon Squeezy.

## Getting started

```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

## Where content lives

| What                              | File                                          |
|-----------------------------------|-----------------------------------------------|
| Site name, URL, contact           | `src/content/site.ts`                         |
| Categories and focus areas        | `src/content/catalog.ts`                      |
| Product registry                  | `src/content/products/index.ts`               |
| Product record type               | `src/content/products/types.ts`               |
| Stockline record, media, sales copy | `src/content/products/stockline/`           |
| Updates / release notes           | `src/content/updates.ts`                      |

Shared pages and components never reference a specific product; they read
from the registry.

### Adding a product

One record plus registration — see [`docs/ADDING-A-PRODUCT.md`](docs/ADDING-A-PRODUCT.md).
Products can use the shared page template or a custom page.

### Publishing an update

Add an entry to the top of `updates` in `src/content/updates.ts`. It gets a
page at `/updates/<slug>` and appears on `/updates`, the home page and the
sitemap. Set `productSlug` to link it to a product.

## Configuration still needed before launch

- `site.contact.email` in `src/content/site.ts` — a verified public contact address.
- Stockline 1.0.0 release date in `src/content/updates.ts`.
- Real Stockline screenshots — see [`docs/SCREENSHOTS.md`](docs/SCREENSHOTS.md).
- Official logo (the favicon in `src/app/icon.tsx` is a placeholder letter mark).
- Public Stockline documentation URL, if one is published (`docs.url` in `src/content/products/stockline/index.ts`).
