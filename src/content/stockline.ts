import type { ScreenshotKey } from "./stockline-screenshots";

/**
 * Stockline sales-page content. Copy describes only what is stated in the
 * product brief — module names, stack, license and limitations. Keep it
 * that way: verify any new claim against the shipped product first.
 */

export type StocklineModule = {
  id: string;
  name: string;
  description: string;
  shot?: ScreenshotKey;
};

/** Modules 3–11 of the sales page (POS and Dashboard have their own sections). */
export const modules: StocklineModule[] = [
  {
    id: "products",
    name: "Products",
    description: "Screens for managing your product catalog — the records every sale, purchase and stock movement refers to.",
    shot: "products",
  },
  {
    id: "inventory",
    name: "Inventory",
    description: "Screens for viewing and managing stock levels across your catalog.",
    shot: "inventory",
  },
  {
    id: "warehouses",
    name: "Warehouses",
    description: "Screens for organizing the warehouses and locations where stock is held.",
  },
  {
    id: "purchasing",
    name: "Purchasing & suppliers",
    description: "Screens for purchasing and for managing the suppliers you buy from.",
    shot: "purchasing",
  },
  {
    id: "sales",
    name: "Sales & invoices",
    description: "Screens for reviewing sales and working with invoices.",
  },
  {
    id: "reports",
    name: "Reports",
    description: "Reporting screens with charts built on Recharts, ready to be fed from your own data.",
    shot: "reports",
  },
  {
    id: "customers",
    name: "Customers",
    description: "Screens for managing customer records.",
  },
  {
    id: "roles",
    name: "Roles & permissions",
    description:
      "An interface for defining roles and what each role can access. Enforcing permissions for real requires your own backend and authentication.",
    shot: "roles",
  },
  {
    id: "settings",
    name: "Settings",
    description: "Settings screens for configuring the application.",
  },
];

export const disclosureExclusions = [
  "Production backend",
  "Database",
  "Persistent authentication",
  "Payment processing",
  "Email service",
  "Persistent inventory storage",
  "Accounting integration",
  "External business integrations",
];

export const included = [
  { title: "Complete source code", body: "The full Next.js and TypeScript project, not a compiled bundle." },
  { title: "Application screens", body: "POS, dashboard, products, inventory, warehouses, purchasing, sales, reports, customers, roles and settings." },
  { title: "Reusable UI components", body: "Shared interface components used across every screen, available for your own pages." },
  { title: "Light and dark themes", body: "Both themes are part of the interface from the start." },
  { title: "Documentation", body: "Guidance for setting up, understanding and customizing the project." },
  { title: "Standard License", body: "Use in one commercial end product or one client project." },
];

export const audiences = [
  {
    title: "Developers building operational software",
    body: "Start a POS, inventory or back-office application from a complete interface and spend your time on the backend and business logic.",
  },
  {
    title: "Agencies delivering a client project",
    body: "Give a retail or inventory client a polished frontend quickly. The Standard License covers one client project.",
  },
  {
    title: "Product teams validating an idea",
    body: "Put realistic screens in front of stakeholders and users early, then connect them to real data as the product takes shape.",
  },
];

export const pricingIncludes = [
  "Complete source code",
  "One-time purchase",
  "One commercial end product or one client project",
  "Commercial use",
  "Source customization",
  "Documentation",
  "Standard License",
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Does Stockline include a backend or database?",
    a: "No. Stockline 1.0.0 is a frontend starter kit. It does not include a production backend, database, persistent authentication, payment processing, email service, persistent inventory storage, accounting integration or external business integrations. You connect the interface to your own services.",
  },
  {
    q: "Can I see it before I buy?",
    a: "Yes. The live demo runs the Stockline interface in your browser so you can explore the screens before purchasing.",
  },
  {
    q: "Can I use Stockline for a client project?",
    a: "Yes. The Standard License covers one commercial end product or one client project.",
  },
  {
    q: "Can I use it in a commercial product?",
    a: "Yes. Commercial use is permitted for one commercial end product under the Standard License.",
  },
  {
    q: "Is this a subscription?",
    a: "No. Stockline is a one-time purchase.",
  },
  {
    q: "Can I modify the source code?",
    a: "Yes. You receive the complete source code and can customize it for your end product or client project.",
  },
  {
    q: "What is Stockline built with?",
    a: "Next.js 16, React, TypeScript, Tailwind CSS, Radix UI, Recharts and Lucide.",
  },
  {
    q: "Who handles checkout?",
    a: "Checkout is handled by Lemon Squeezy. Syleri Technologies does not process or store your payment details on this website.",
  },
];
