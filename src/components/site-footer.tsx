import Link from "next/link";
import { developerProducts, productPath, products } from "@/content/products";
import { site } from "@/content/site";
import { LogoSymbol } from "./logo";
import { Container } from "./ui/layout";

type FooterLink = { label: string; href: string; external?: boolean };

/** Caps keep the footer to one or two lines as the catalog grows; the rest is on /products. */
const MAX_PRODUCT_LINKS = 3;
const MAX_DEMO_LINKS = 2;

function footerLinks(): { main: FooterLink[]; legal: FooterLink[] } {
  const productLinks: FooterLink[] = products.slice(0, MAX_PRODUCT_LINKS).map((p) => ({ label: p.name, href: productPath(p) }));
  const demoLinks: FooterLink[] = developerProducts()
    .filter((p) => p.demoUrl)
    .slice(0, MAX_DEMO_LINKS)
    .map((p) => ({ label: `${p.name} demo`, href: p.demoUrl!, external: true }));

  return {
    main: [
      { label: "Products", href: "/products" },
      ...productLinks,
      { label: "Company", href: "/company" },
      { label: "Developers", href: "/developers" },
      ...demoLinks,
      { label: "Updates", href: "/updates" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  };
}

function FooterItem({ link, quiet = false }: { link: FooterLink; quiet?: boolean }) {
  const cls = `inline-flex min-h-8 items-center text-[0.9375rem] transition-colors hover:text-ink ${quiet ? "text-muted" : "text-ink-soft"}`;
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  );
}

export function SiteFooter() {
  const { main, legal } = footerLinks();
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-6 py-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Footer" className="order-1 lg:order-2">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:flex sm:flex-wrap sm:gap-x-6">
            {main.map((link) => (
              <li key={link.href}>
                <FooterItem link={link} />
              </li>
            ))}
            {legal.map((link) => (
              <li key={link.href}>
                <FooterItem link={link} quiet />
              </li>
            ))}
          </ul>
        </nav>
        <div className="order-2 flex items-center gap-3 lg:order-1">
          <Link href="/" className="-mx-1 inline-flex rounded px-1" aria-label="Syleri Technologies home">
            <LogoSymbol className="h-6" />
          </Link>
          <p className="type-label">
            © {site.copyrightYear} {site.name} · India
          </p>
        </div>
      </Container>
    </footer>
  );
}
