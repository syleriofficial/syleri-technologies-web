import { ogCard, ogSize } from "@/lib/og";

export const alt = "Syleri Technologies — Software Products & Developer Tools";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Software products & developer tools",
    title: "Technology products built to make complex work simpler.",
    subtitle: "syleritechnologies.com",
  });
}
