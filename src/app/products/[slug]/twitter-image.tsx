import { templateSlugs } from "@/content/products";

export { default, alt, size, contentType } from "./opengraph-image";

export const dynamicParams = false;

export function generateStaticParams() {
  return templateSlugs();
}
