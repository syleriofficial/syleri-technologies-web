import { stockline } from "@/content/products/stockline";
import { ogSize, productOgAlt, productOgImage } from "@/lib/og";

export const alt = productOgAlt(stockline);
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return productOgImage(stockline);
}
