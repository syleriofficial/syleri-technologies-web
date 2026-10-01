"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { NavItem } from "@/content/site";
import { isActive } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

/**
 * Mobile navigation built on the native modal <dialog>: focus is trapped,
 * the rest of the page is inert, Escape closes it, and focus returns to
 * the menu button automatically.
 */
export function MobileMenu({ items, contact }: { items: NavItem[]; contact: NavItem }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // If the viewport grows to the desktop layout while open, close the menu.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
    const onChange = () => {
      if (mq.matches) dialogRef.current?.close();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const all = [...items, contact];

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-controls="mobile-menu"
        className="inline-flex h-10 items-center gap-2 rounded-[0.625rem] border border-line px-3 text-[0.9375rem] font-[560] text-ink hover:border-line-strong"
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
          <path d="M3 6.5h14M3 13.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        Menu
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Site navigation"
        className="mobile-menu m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-ink backdrop:bg-transparent"
        onClick={(e) => {
          // Close when a link inside is activated.
          if ((e.target as HTMLElement).closest("a")) close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <span className="text-[1.0625rem] font-[680] tracking-[-0.02em]">
              Syleri <span className="font-[450] text-muted">Technologies</span>
            </span>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-10 items-center gap-2 rounded-[0.625rem] border border-line px-3 text-[0.9375rem] font-[560]"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
                <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pt-4">
            <ul>
              <li>
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  className="flex items-center justify-between border-b border-line py-4 text-[1.625rem] font-[620] tracking-[-0.025em] aria-[current=page]:text-accent"
                >
                  Home
                </Link>
              </li>
              {all.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex items-center justify-between border-b border-line py-4 text-[1.625rem] font-[620] tracking-[-0.025em] aria-[current=page]:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between border-t border-line px-5 py-4 text-[0.9375rem] text-muted">
            <span>Theme</span>
            <ThemeToggle className="border border-line" />
          </div>
        </div>
      </dialog>
    </>
  );
}
