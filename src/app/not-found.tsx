import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/layout";

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
      <p className="mt-10 text-[0.9375rem] text-muted">
        Looking for Stockline? <Link href="/products/stockline" className="text-ink underline underline-offset-4">Go to the Stockline page</Link>.
      </p>
    </Container>
  );
}
