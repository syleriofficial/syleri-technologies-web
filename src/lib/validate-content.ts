import fs from "node:fs";
import path from "node:path";
import { categories, focusAreas } from "@/content/catalog";
import { allProducts } from "@/content/products";
import { updates } from "@/content/updates";

/**
 * Build-time content checks. Called from the sitemap and product page
 * generation, so `npm run build` fails loudly on a broken record instead of
 * shipping a broken page.
 */
let done = false;

export function validateContent() {
  if (done) return;
  const errors: string[] = [];
  const slugs = new Set<string>();
  const categoryIds = new Set<string>(categories.map((c) => c.id));
  const areaIds = new Set<string>(focusAreas.map((a) => a.id));

  for (const p of allProducts) {
    const at = `product "${p.slug}"`;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) errors.push(`${at}: slug must be lowercase kebab-case`);
    if (slugs.has(p.slug)) errors.push(`${at}: duplicate slug`);
    slugs.add(p.slug);
    if (!categoryIds.has(p.category)) errors.push(`${at}: unknown category "${p.category}"`);
    for (const a of p.areas) if (!areaIds.has(a)) errors.push(`${at}: unknown focus area "${a}"`);

    const customPage = path.join(process.cwd(), "src/app/products", p.slug, "page.tsx");
    const hasCustom = fs.existsSync(customPage);
    if (p.page === "custom" && !hasCustom) errors.push(`${at}: page is "custom" but src/app/products/${p.slug}/page.tsx is missing`);
    if (p.page === "template" && hasCustom) errors.push(`${at}: page is "template" but a custom page exists — set page: "custom"`);

    for (const url of [p.demoUrl, p.checkoutUrl, p.docs?.url]) {
      if (url && !url.startsWith("https://")) errors.push(`${at}: external URL must be https: ${url}`);
    }
    if (p.checkoutUrl && !p.price) errors.push(`${at}: checkoutUrl requires price`);
    if (p.status === "available" && p.price && !p.checkoutUrl) errors.push(`${at}: priced available product needs checkoutUrl`);
  }

  const updateSlugs = new Set<string>();
  for (const u of updates) {
    if (updateSlugs.has(u.slug)) errors.push(`update "${u.slug}": duplicate slug`);
    updateSlugs.add(u.slug);
    if (u.productSlug && !slugs.has(u.productSlug)) errors.push(`update "${u.slug}": unknown productSlug "${u.productSlug}"`);
    if (u.date && !/^\d{4}-\d{2}-\d{2}$/.test(u.date)) errors.push(`update "${u.slug}": date must be YYYY-MM-DD`);
  }

  if (errors.length) throw new Error(`Content validation failed:\n- ${errors.join("\n- ")}`);
  done = true;
}
