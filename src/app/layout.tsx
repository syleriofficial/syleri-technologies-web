import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Self-hosted variable font (SIL OFL 1.1, see ./fonts/OFL.txt). No third-party font requests.
const schibsted = localFont({
  src: "./fonts/SchibstedGrotesk-Variable.woff2",
  variable: "--font-schibsted",
  weight: "400 900",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/brand/favicon-light.png", media: "(prefers-color-scheme: light)", type: "image/png" },
      { url: "/brand/favicon-dark.png", media: "(prefers-color-scheme: dark)", type: "image/png" },
      { url: "/brand/favicon-light.png", type: "image/png" },
    ],
    apple: [
      { url: "/brand/apple-icon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/brand/apple-icon-dark.png", media: "(prefers-color-scheme: dark)" },
      { url: "/brand/apple-icon-light.png" },
    ],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1417" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={schibsted.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-3 z-50 -translate-y-24 rounded-[0.625rem] bg-ink px-4 py-2.5 text-[0.9375rem] font-[560] text-bg focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
