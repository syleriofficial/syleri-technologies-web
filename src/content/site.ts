/**
 * Global site configuration.
 *
 * Everything here is factual and public. Do not add secrets, API keys or
 * private paths to this file.
 */
export const site = {
  name: "Syleri Technologies",
  url: "https://syleritechnologies.com",
  title: "Syleri Technologies — Software, Platforms & Technology Products",
  description:
    "Syleri Technologies builds software, platforms and technology products designed to make complex work simpler.",
  /** Optional company tagline. Shown beside the logo where appropriate — never inside the logo itself. */
  tagline: "Technology for what’s next.",
  locale: "en_US",
  copyrightYear: 2026,

  /**
   * Contact configuration.
   *
   * Policy: the site never publishes an email address — not in page copy,
   * mailto links, metadata, JSON-LD or client-side JavaScript. Do not add one.
   *
   * `formEnabled` switches on the secure contact form (src/components/
   * contact-form.tsx). Submissions are handled by a server action
   * (src/app/contact/actions.ts) that validates input, applies honeypot +
   * timing + rate-limit spam protection, and sends via src/lib/contact/
   * mailer.ts — which reads the destination mailbox and mail-service API
   * key from environment variables (see .env.example) and never exposes
   * them to the client. Set this back to false to show the neutral status
   * message instead, with no code changes needed.
   */
  contact: {
    formEnabled: true as boolean,
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
