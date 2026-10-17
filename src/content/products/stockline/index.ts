import type { Product } from "../types";
import { stocklineMedia } from "./media";

export const stockline: Product = {
  slug: "stockline",
  name: "Stockline",
  category: "developer-tools",
  kind: "Frontend starter kit",
  subtitle: "POS & Inventory Management Dashboard for Next.js",
  pitch: "a Next.js POS and inventory dashboard starter kit, with working interface screens you can explore before buying",
  summary:
    "A production-quality frontend starter kit for building retail, inventory, warehouse, purchasing, sales and operational software.",
  version: "1.0.0",
  status: "available",
  page: "custom",
  featured: true,
  areas: ["business-operations", "developer-tools"],
  forDevelopers: true,
  technology: ["Next.js 16", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Recharts", "Lucide"],
  stackSummary: "Next.js 16 · TypeScript",
  demoUrl: "https://stockline-demo.vercel.app/",
  checkoutUrl: "https://syleri-technologies.lemonsqueezy.com/checkout/buy/58a0a32e-641c-4e39-869b-2a687c791ccb",
  price: {
    currency: "USD",
    amount: 49,
    regularAmount: 69,
    label: "$49 launch price",
    offerName: "Stockline Standard License",
  },
  license: {
    name: "Standard License",
    summary: "One commercial end product or one client project.",
  },
  docs: {
    // No public documentation URL exists yet. Do not add one until it is published.
    note: "Documentation included with purchase.",
  },
  cover: stocklineMedia.pos,
  showcase: {
    title: "Every screen of a POS and inventory app, ready for your backend.",
    lead: "Point of sale, dashboard, products, inventory, warehouses, purchasing, sales, reports, customers, roles and settings — built in Next.js and TypeScript, with light and dark themes. Open each one in the live demo before you buy.",
    image: stocklineMedia.dashboard,
    figure: stocklineMedia.dashboardCards,
    figureDark: stocklineMedia.dashboardCardsDark,
    caption: "Dashboard · today’s figures across every store",
  },
  seo: {
    title: "Stockline — POS & Inventory Management Next.js Dashboard",
    description:
      "Stockline is a Next.js and TypeScript frontend starter kit for POS and inventory software: sales, stock, warehouses, purchasing, reports, customers and roles.",
  },
  schema: {
    category: "Developer Tool / Frontend Starter Kit",
    description:
      "POS & inventory management dashboard for Next.js — a frontend starter kit built with Next.js, React and TypeScript.",
    sku: "stockline-standard",
  },
};
