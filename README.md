# syleri-technologies-web

Source for **syleritechnologies.com**, the corporate and product website of
Syleri Technologies.

> Live at https://syleritechnologies.com — deployed by Vercel from `main`.

## Stack

- Next.js 16.3 (App Router, static generation), React 19, TypeScript
- Tailwind CSS 4
- Self-hosted fonts: Schibsted Grotesk variable for all text, IBM Plex Mono Regular for technical labels (both SIL OFL 1.1)
- No CMS, database, auth, analytics or backend. Checkout is handled by Lemon Squeezy.

## Getting started

```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm test           # unit tests (Node's built-in test runner, no extra dependencies)
npm run build
npm run test:smoke # starts the production build and checks every public page
```

CI (`.github/workflows/ci.yml`) runs all of the above, plus a production
dependency audit, on every pull request and push to `main`.

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
  "Technology for what’s next." (`site.tagline`) appears on the main social
  card, never inside the logo.

## Design system

- **Type:** Schibsted Grotesk, weights 400/500/600 only, on the scale in
  `src/app/globals.css` (`type-display`, `type-product`, `type-title`,
  `type-h2`, `type-h3`, `type-lead`). IBM Plex Mono (`font-mono`,
  `type-label`) is only for versions, prices, dates, captions and section
  labels.
- **Colour:** paper, ink, muted and the logo's cobalt (actions and links
  only). The deep-navy `band` colour appears once per page, behind the main
  product screenshot.
- **Structure:** sections are separated by hairline rules, never grey bands
  or cards. Numbered sections use `IndexedSection` (label in the left three
  columns, content in the right nine); facts use `FactsRow`; two-column
  rules use `RuledRow` (`src/components/ui/layout.tsx`).
- **Screenshots:** always real, always captioned (`Figure`, `FigureBand` in
  `src/components/figure.tsx`). Give a screenshot a `mobile` crop so phones
  show a readable part of the screen; crops are cut by
  `scripts/crop-stockline-screenshots.py`.

## Contact

The Contact page has a contact form (`site.contact.formEnabled` in
`src/content/site.ts`). Submissions are handled by a server action and sent
through Resend; the server needs these environment variables in the hosting
environment (see `.env.example`):

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (destination mailbox, never published)
- `CONTACT_FROM_EMAIL` (verified sender on the Resend domain)

The visitor's address is used as the reply-to. Set `formEnabled` to false to
show a neutral status message instead of the form. The site never publishes
an email address.

Optional: Stockline documentation is included with purchase;
there is no public docs URL. If one is published later, set `docs.url` in
`src/content/products/stockline/index.ts`.
