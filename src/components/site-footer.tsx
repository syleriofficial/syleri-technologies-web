import Link from "next/link";
import { developerProducts, productPath, products } from "@/content/products";
import { site } from "@/content/site";
import { Logo } from "./logo";
import { Container } from "./ui/layout";

type FooterLink = { label: string; href: string; external?: boolean };

/** Caps keep the footer balanced as the catalog grows; the overflow goes to a "view all" link. */
const MAX_PRODUCT_LINKS = 6;
const MAX_DEMO_LINKS = 3;

function buildGroups(): { title: string; links: FooterLink[] }[] {
  const productLinks: FooterLink[] = products.slice(0, MAX_PRODUCT_LINKS).map((p) => ({ label: p.name, href: productPath(p) }));
  if (products.length > MAX_PRODUCT_LINKS) productLinks.push({ label: "All products", href: "/products" });

  const demoLinks: FooterLink[] = developerProducts()
    .filter((p) => p.demoUrl)
    .slice(0, MAX_DEMO_LINKS)
    .map((p) => ({ label: `${p.name} Demo`, href: p.demoUrl!, external: true }));

  return [
    { title: "Products", links: productLinks.length ? productLinks : [{ label: "All products", href: "/products" }] },
    {
      title: "Company",
      links: [
        { label: "Company", href: "/company" },
        { label: "Updates", href: "/updates" },
        { label: "Contact", href: "/contact" },
      ],
    },
    { title: "Developers", links: [{ label: "Developers", href: "/developers" }, ...demoLinks] },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ];
}

export function SiteFooter() {
  const groups = buildGroups();
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-xs">
            <Link href="/" className="-mx-1 inline-flex rounded px-1" aria-label="Syleri Technologies home">
              <Logo className="h-7" />
            </Link>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{site.tagline}</p>
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
