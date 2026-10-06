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

## Brand

- Approved logo assets live in `public/brand/` (light/dark lockups, the
  blue "S" symbol, favicons and Apple touch icons) and are rendered by
  `src/components/logo.tsx`.
- The logo is the symbol plus "Syleri Technologies" only. The tagline
  "Technology for what’s next." (`site.tagline`) appears beside it where
  appropriate (footer, main social card), never inside the logo.

## Configuration still needed before launch

- Contact form delivery: set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and
  `CONTACT_FROM_EMAIL` in the hosting environment (see `.env.example`).
  These stay server-side; the site never publishes an email address.

Not required for launch: Stockline documentation is included with purchase;
there is no public docs URL. If one is published later, set `docs.url` in
`src/content/products/stockline/index.ts`.
