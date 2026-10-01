"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/site";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative inline-flex h-10 items-center rounded-[0.625rem] px-2.5 lg:px-3 text-[0.9375rem] transition-colors hover:text-ink ${
                active ? "font-[580] text-ink" : "text-muted"
              }`}
            >
              {item.label}
              {active ? <span aria-hidden="true" className="absolute inset-x-2.5 lg:inset-x-3 -bottom-[0.6875rem] h-0.5 bg-accent" /> : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
