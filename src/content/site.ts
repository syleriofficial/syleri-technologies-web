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
   * Public contact destination.
   *
   * CONFIGURATION NEEDED: no verified public contact address has been
   * supplied yet. While `email` is null the contact page shows a clear
   * "not yet configured" state and no mailto links are rendered anywhere.
   * Set this to a verified, monitored address (e.g. a domain mailbox on
   * syleritechnologies.com) before launch.
   */
  contact: {
    email: null as string | null,
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
