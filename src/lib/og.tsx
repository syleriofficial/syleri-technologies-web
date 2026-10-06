import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { categoryName, type Product } from "@/content/products";

/** Approved light-background logo lockup (symbol + "Syleri Technologies"), 893×386. */
const LOGO_W = 893;
const LOGO_H = 386;
let logoDataUri: string | undefined;
function brandLogo() {
  logoDataUri ??= `data:image/png;base64,${fs
    .readFileSync(path.join(process.cwd(), "public/brand/syleri-technologies-logo-light.png"))
    .toString("base64")}`;
  return logoDataUri;
}

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

/** Social card: approved logo lockup plus real words. No product UI is drawn. */
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
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img>. */}
        <img src={brandLogo()} alt="Syleri Technologies" width={Math.round((LOGO_W * 92) / LOGO_H)} height={92} style={{ marginTop: -12, marginLeft: -6 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#0063c8", marginBottom: 18 }}>{kicker}</div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 960 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#56656c", marginTop: 24, maxWidth: 920 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 120, background: "#0063c8" }} />
      </div>
    ),
    ogSize,
  );
}
