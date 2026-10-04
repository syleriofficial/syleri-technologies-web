/**
 * Global site configuration.
 *
 * Everything here is factual and public. Do not add secrets, API keys or
 * private paths to this file.
 */
export const site = {
  name: "Syleri Technologies",
  url: "https://syleritechnologies.com",
  title: "Syleri Technologies — Software Products & Developer Tools",
  description:
    "Syleri Technologies builds software products and developer tools designed to make complex work simpler.",
  locale: "en_US",
  copyrightYear: 2026,

  /**
   * Contact configuration.
   *
   * Policy: the site never publishes an email address — not in page copy,
   * mailto links, metadata, JSON-LD or client-side JavaScript. Do not add one.
   *
   * `formEnabled` is the switch for a future secure contact form. Keep it
   * false until a server-side handler exists (a Next.js route handler or
   * server action that validates input, applies spam protection and
   * delivers messages without exposing the destination mailbox). Then set it
   * to true and render the form in the slot marked in
   * src/app/contact/page.tsx. While false, the Contact page shows a neutral
   * status message and no form.
   */
  contact: {
    formEnabled: false as boolean,
  },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Company", href: "/company" },
  { label: "Developers", href: "/developers" },
  { label: "Updates", href: "/updates" },
];

export const contactNav: NavItem = { label: "Contact", href: "/contact" };
