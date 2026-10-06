import { site } from "@/content/site";
import { ogCard, ogSize } from "@/lib/og";

export const alt = site.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: site.tagline,
    title: "Technology products built to make complex work simpler.",
    subtitle: "Software, platforms and technology products",
  });
}
