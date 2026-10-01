import Link from "next/link";
import { products, STOCKLINE_DEMO_URL } from "@/content/products";
import { site } from "@/content/site";
import { Wordmark } from "./site-header";
import { Container } from "./ui/layout";

type FooterLink = { label: string; href: string; external?: boolean };

const groups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Products",
    links: products.map((p) => ({ label: p.name, href: p.href })),
  },
  {
    title: "Company",
    links: [
      { label: "Company", href: "/company" },
      { label: "Updates", href: "/updates" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Developers", href: "/developers" },
      { label: "Stockline Demo", href: STOCKLINE_DEMO_URL, external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-xs">
            <Link href="/" className="-mx-1 rounded px-1" aria-label="Syleri Technologies home">
              <Wordmark />
            </Link>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              Software products and developer tools designed to make complex work simpler.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.875rem] font-[620] text-ink">{group.title}</h2>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
                        >
                          {link.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <Link href={link.href} className="text-[0.9375rem] text-muted transition-colors hover:text-ink">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <p className="mt-14 border-t border-line pt-6 text-[0.875rem] text-muted">
          © {site.copyrightYear} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
