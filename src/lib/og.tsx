import { ImageResponse } from "next/og";
import { categoryName, type Product } from "@/content/products";

export const ogSize = { width: 1200, height: 630 };

/** Social card for any product, built from its record. */
export function productOgImage(p: Product) {
  return ogCard({
    kicker: `${p.name} v${p.version}`,
    title: p.subtitle,
    subtitle: [categoryName(p.category), p.kind, ...(p.technology ?? []).slice(0, 2)].join(" · "),
  });
}

export function productOgAlt(p: Product) {
  return `${p.name} — ${p.subtitle}`;
}

/** Text-only social card. No product UI is drawn — only real words. */
export function ogCard({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafbfa",
          color: "#142026",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: 30 }}>
          <span style={{ fontWeight: 700 }}>Syleri</span>
          <span style={{ color: "#56656c" }}>Technologies</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#0b6e5f", marginBottom: 18 }}>{kicker}</div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 960 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#56656c", marginTop: 24, maxWidth: 920 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 120, background: "#0b6e5f" }} />
      </div>
    ),
    ogSize,
  );
}
