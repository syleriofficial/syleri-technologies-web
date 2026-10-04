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
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="-mx-1 flex items-center rounded px-1" aria-label="Syleri Technologies home">
          <span className="hidden md:block">
            <Logo className="h-8" priority />
          </span>
          <span className="md:hidden">
            <LogoSymbol className="h-8" priority />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <DesktopNav items={primaryNav} />
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href={contactNav.href}
            className="inline-flex h-10 items-center rounded-[0.625rem] border border-line-strong px-4 text-[0.9375rem] font-[560] text-ink transition-colors hover:border-ink"
          >
            {contactNav.label}
          </Link>
        </div>

        <div className="md:hidden">
          <MobileMenu items={primaryNav} contact={contactNav} />
        </div>
      </Container>
    </header>
  );
}
