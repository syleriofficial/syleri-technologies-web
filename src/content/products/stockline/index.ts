import type { Product } from "../types";
import { stocklineMedia } from "./media";

export const stockline: Product = {
  slug: "stockline",
  name: "Stockline",
  category: "developer-tools",
  kind: "Frontend starter kit",
  subtitle: "POS & Inventory Management Dashboard for Next.js",
  summary:
    "A production-quality frontend starter kit for building retail, inventory, warehouse, purchasing, sales and operational software.",
  version: "1.0.0",
  status: "available",
  page: "custom",
  featured: true,
  areas: ["business-operations", "developer-tools"],
  forDevelopers: true,
  technology: ["Next.js 16", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Recharts", "Lucide"],
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
    lead: "A production-quality frontend for building retail, inventory, warehouse, purchasing and sales software, ready to connect to your own backend.",
    image: stocklineMedia.dashboard,
    imageDark: stocklineMedia.dark,
    points: [
      { title: "Point of sale", body: "A terminal screen for building a cart and working through a sale." },
      { title: "Inventory and warehouses", body: "Stock levels, adjustments and transfers across locations." },
      { title: "Reports", body: "Sales and profit trends, with charts ready for real data." },
    ],
  },
  seo: {
    title: "Stockline — POS & Inventory Management Next.js Dashboard",
    description:
      "Build POS and inventory software faster with Stockline, a premium Next.js and TypeScript frontend starter kit for sales, stock, warehouses, purchasing, reports, customers, roles and more.",
  },
  schema: {
    category: "Developer Tool / Frontend Starter Kit",
    description:
      "POS & inventory management dashboard for Next.js — a frontend starter kit built with Next.js, React and TypeScript.",
    sku: "stockline-standard",
  },
};
