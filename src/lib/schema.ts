import { categoryName, productPath, type Product } from "@/content/products";
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
 * Product schema built from a product record. An Offer is included only when
 * the product is available with a real price and checkout. Never adds ratings
 * or reviews.
 */
export function productSchema(p: Product) {
  const url = `${site.url}${productPath(p)}`;
  const offer =
    p.status === "available" && p.price && p.checkoutUrl
      ? {
          "@type": "Offer",
          name: p.price.offerName,
          price: p.price.amount.toFixed(2),
          priceCurrency: p.price.currency,
          availability: "https://schema.org/InStock",
          url: p.checkoutUrl,
          seller: { "@id": `${site.url}/#organization` },
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: p.name,
    description: p.schema.description,
    category: p.schema.category || categoryName(p.category),
    url,
    ...(p.schema.sku ? { sku: p.schema.sku } : {}),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": `${site.url}/#organization` },
    additionalProperty: [{ "@type": "PropertyValue", name: "Version", value: p.version }],
    ...(offer ? { offers: offer } : {}),
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

export function productBreadcrumb(p: Product) {
  return breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: p.name, path: productPath(p) },
  ]);
}
