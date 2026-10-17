import Link from "next/link";
import { contactNav, primaryNav } from "@/content/site";
import { Logo, LogoSymbol } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { DesktopNav } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { Container } from "./ui/layout";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <Container className="flex h-16 items-center gap-6">
        <Link href="/" className="-mx-1 flex shrink-0 items-center rounded px-1" aria-label="Syleri Technologies home">
          {/* Full lockup at every width from 360px up; the symbol alone only on very narrow screens. */}
          <span className="hidden min-[22.5rem]:block">
            <Logo className="h-9 md:h-11" />
          </span>
          <span className="min-[22.5rem]:hidden">
            <LogoSymbol className="h-8" />
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden md:block">
          <DesktopNav items={primaryNav} />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span aria-hidden="true" className="h-5 w-px bg-line" />
          <Link
            href={contactNav.href}
            className="inline-flex h-10 items-center px-1.5 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent"
          >
            {contactNav.label}
          </Link>
          <ThemeToggle />
        </div>

        <div className="ml-auto md:hidden">
          <MobileMenu items={primaryNav} contact={contactNav} />
        </div>
      </Container>
    </header>
  );
}
