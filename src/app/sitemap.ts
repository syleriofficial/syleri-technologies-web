import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { updates } from "@/content/updates";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/company", priority: 0.6, changeFrequency: "monthly" },
    { path: "/developers", priority: 0.7, changeFrequency: "monthly" },
    { path: "/updates", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path === "/" ? "" : r.path}`,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...products.map((p) => ({
      url: `${site.url}${p.href}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...updates.map((u) => ({
      url: `${site.url}/updates/${u.slug}`,
      ...(u.date ? { lastModified: u.date } : {}),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
