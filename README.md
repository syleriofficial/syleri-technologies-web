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

| What                       | File                                     |
|----------------------------|------------------------------------------|
| Site name, URL, contact    | `src/content/site.ts`                    |
| Product catalog            | `src/content/products.ts`                |
| Stockline sales copy, FAQ  | `src/content/stockline.ts`               |
| Stockline screenshots      | `src/content/stockline-screenshots.ts`   |
| Updates / release notes    | `src/content/updates.ts`                 |
| Developer hub resources    | `src/content/developers.ts`              |

### Adding a product

1. Add an entry to `products` in `src/content/products.ts`. It appears in the
   home page index, `/products`, the footer and the sitemap automatically.
2. If it has a new category, add a line to `categoryDescriptions`.
3. Create `src/app/products/<slug>/page.tsx` for its dedicated page.
4. If it is a developer product, add a resource group in `src/content/developers.ts`.

### Publishing an update

Add an entry to the top of `updates` in `src/content/updates.ts`. It gets a
page at `/updates/<slug>` and appears on `/updates`, the home page and the
sitemap.

## Configuration still needed before launch

- `site.contact.email` in `src/content/site.ts` — a verified public contact address.
- Stockline 1.0.0 release date in `src/content/updates.ts`.
- Real Stockline screenshots — see [`docs/SCREENSHOTS.md`](docs/SCREENSHOTS.md).
- Official logo (the favicon in `src/app/icon.tsx` is a placeholder letter mark).
- Public Stockline documentation URL, if one is published (`src/content/developers.ts`).
