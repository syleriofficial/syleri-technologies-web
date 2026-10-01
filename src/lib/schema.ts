import { products } from "@/content/products";
import { site } from "@/content/site";

/** Organization — factual fields only (no logo, address, founders or social profiles until supplied). */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  description: site.description,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": `${site.url}/#organization` },
};

/**
 * Product schema for Stockline. One real offer: $49 USD via Lemon Squeezy.
 * No ratings or reviews — none exist yet.
 */
export function stocklineProductSchema() {
  const p = products.find((x) => x.slug === "stockline")!;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${site.url}${p.href}#product`,
    name: p.name,
    description:
      "POS & inventory management dashboard for Next.js — a frontend starter kit built with Next.js, React and TypeScript.",
    category: "Developer Tool / Frontend Starter Kit",
    url: `${site.url}${p.href}`,
    sku: "stockline-standard",
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": `${site.url}/#organization` },
    additionalProperty: [{ "@type": "PropertyValue", name: "Version", value: p.version }],
    offers: {
      "@type": "Offer",
      name: "Stockline Standard License",
      price: "49.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: p.checkoutUrl,
      seller: { "@id": `${site.url}/#organization` },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
