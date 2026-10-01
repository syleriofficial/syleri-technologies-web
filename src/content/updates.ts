/**
 * Company and product updates.
 *
 * Add new entries to the top of `updates`. Each entry automatically gets
 * a page at /updates/<slug>, a place on the /updates index, the home page
 * "Latest updates" list and the sitemap.
 *
 * Only publish factual entries. Do not back-date or invent history.
 */

export type UpdateKind = "release" | "announcement";

export type Update = {
  slug: string;
  title: string;
  kind: UpdateKind;
  /**
   * ISO date (YYYY-MM-DD). `null` means the date has not been confirmed
   * yet; the entry renders without a date rather than showing a guess.
   */
  date: string | null;
  summary: string;
  /** Plain paragraphs. */
  body: string[];
  /** Optional bulleted facts shown after the body. */
  highlights?: string[];
  productSlug?: string;
  links?: { label: string; href: string; external?: boolean }[];
};

export const updates: Update[] = [
  {
    slug: "stockline-1-0-0",
    title: "Stockline 1.0.0",
    kind: "release",
    // CONFIGURATION NEEDED: supply the confirmed release date.
    date: null,
    summary: "Initial commercial release of Stockline, a POS and inventory management dashboard for Next.js.",
    body: [
      "Stockline 1.0.0 is the first commercial release from Syleri Technologies. It is a frontend starter kit for teams building retail, inventory, warehouse, purchasing and sales software on Next.js and TypeScript.",
      "Version 1.0.0 is frontend-only. It does not include a production backend, database, persistent authentication, payment processing, email service, persistent inventory storage, accounting integration or external business integrations.",
    ],
    highlights: [
      "Built with Next.js 16, React, TypeScript, Tailwind CSS, Radix UI, Recharts and Lucide",
      "Screens for POS, dashboard, products, inventory, warehouses, purchasing, sales, reports, customers, roles and settings",
      "Light and dark themes",
      "Standard License: one commercial end product or one client project",
    ],
    productSlug: "stockline",
    links: [
      { label: "Stockline product page", href: "/products/stockline" },
      { label: "Live demo", href: "https://stockline-demo.vercel.app/", external: true },
    ],
  },
];

export const updateKindLabel: Record<UpdateKind, string> = {
  release: "Release",
  announcement: "Announcement",
};

export function getUpdate(slug: string) {
  return updates.find((u) => u.slug === slug);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
