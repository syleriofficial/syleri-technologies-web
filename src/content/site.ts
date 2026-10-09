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
   * `formEnabled` is currently false: the Contact page shows a neutral
   * status message and the contact form is off. No mail-service environment
   * variables are needed while it is false.
   *
   * The form code is kept, isolated, for later: src/components/
   * contact-form.tsx, the server action in src/app/contact/actions.ts
   * (honeypot, timing and rate-limit spam protection; it refuses all
   * submissions while this flag is false), and src/lib/contact/mailer.ts,
   * which sends via Resend using server-side environment variables (see
   * .env.example). To re-enable: configure those variables in the hosting
   * environment, then set this to true.
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
