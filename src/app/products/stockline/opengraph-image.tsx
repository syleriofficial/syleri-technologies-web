import { ogCard, ogSize } from "@/lib/og";

export const alt = "Stockline — POS & Inventory Management Dashboard for Next.js";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Stockline v1.0.0",
    title: "POS & Inventory Management Dashboard for Next.js",
    subtitle: "Frontend starter kit · Next.js · React · TypeScript",
  });
}
