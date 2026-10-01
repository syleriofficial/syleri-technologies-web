import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/layout";
import { productPath, products } from "@/content/products";

export const metadata = { title: "Page not found", alternates: { canonical: null } };

export default function NotFound() {
  return (
    <Container className="pb-28 pt-20 sm:pt-28">
      <p className="text-[0.9375rem] text-muted">404</p>
      <h1 className="type-title mt-3 max-w-[20ch]">This page doesn&rsquo;t exist.</h1>
      <p className="type-lead mt-5 max-w-[44ch]">
        The link may be out of date, or the address may have been mistyped. Try the products page or start from the home
        page.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/products" size="lg">
          Explore products
        </ButtonLink>
        <ButtonLink href="/" size="lg" variant="secondary">
          Go to home page
        </ButtonLink>
      </div>
      {products.length ? (
        <nav aria-label="Products" className="mt-12 max-w-md">
          <h2 className="text-[0.9375rem] font-[620]">Products</h2>
          <ul className="mt-3 border-t border-line">
            {products.slice(0, 5).map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link href={productPath(p)} className="block py-3 text-[0.9375rem] text-ink hover:text-accent">
                  {p.name} <span className="text-muted">— {p.subtitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </Container>
  );
}
