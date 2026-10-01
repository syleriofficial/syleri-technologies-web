import { getProduct, templateSlugs } from "@/content/products";
import { ogCard, ogSize, productOgImage } from "@/lib/og";

export const dynamicParams = false;

export function generateStaticParams() {
  return templateSlugs();
}

export const alt = "Syleri Technologies product";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) return ogCard({ kicker: "Syleri Technologies", title: "Products", subtitle: "syleritechnologies.com" });
  return productOgImage(p);
}
