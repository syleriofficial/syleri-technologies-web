import fs from "node:fs";
import path from "node:path";
import type { ProductMedia } from "@/content/products";

/** Server-only: whether a media file has actually been added under /public. */
export function mediaExists(media: ProductMedia) {
  return fs.existsSync(path.join(process.cwd(), "public", media.src));
}
