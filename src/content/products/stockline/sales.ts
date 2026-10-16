/**
 * Stockline sales-page content. Copy describes only what is stated in the
 * product brief — screen areas, stack, license and limitations. Keep it
 * that way: verify any new claim against the shipped product first.
 */

/** Every area of the app in 1.0.0, one line each. All of them open in the live demo. */
export const screenAreas: { name: string; description: string }[] = [
  { name: "POS terminal", description: "Build a cart and take a sale." },
  { name: "Dashboard", description: "Revenue, orders, profit and stock at a glance." },
  { name: "Products", description: "The catalog every sale, purchase and stock movement refers to." },
  { name: "Inventory and warehouses", description: "Stock levels, adjustments and transfers across locations." },
  { name: "Purchasing and suppliers", description: "Purchase orders and the suppliers you buy from." },
  { name: "Sales and invoices", description: "Sales orders, invoices, returns and refunds." },
  { name: "Reports", description: "Sales and profit charts built on Recharts, ready for your own data." },
  { name: "Customers", description: "Customer records." },
  { name: "Roles and permissions", description: "Who can see and change what. Enforcing it needs your own backend and authentication." },
  { name: "Settings", description: "Application configuration." },
];

/** What a purchase contains (besides the license, which the page states once). */
export const included = [
  "The complete Next.js and TypeScript project, not a compiled bundle",
  "Reusable UI components for your own pages",
  "Setup and customization documentation",
  "Light and dark themes",
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

export const audiences = [
  { title: "Developers", body: "Skip building the interface and spend your time on the backend and business logic." },
  { title: "Agencies", body: "Hand a retail or inventory client a finished frontend, fast. One license covers one client project." },
  { title: "Product teams", body: "Put realistic screens in front of users early, then connect them to real data." },
];

/**
 * Questions not already answered on the page. Backend, license and stack
 * questions are answered by their own sections.
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: "Can I try it before I buy?",
    a: "Yes. The live demo runs the Stockline interface in your browser, so you can open every screen before purchasing.",
  },
  {
    q: "Is it a subscription?",
    a: "No. Stockline is a one-time purchase.",
  },
  {
    q: "Can I change the source code?",
    a: "Yes. You receive the complete source code and can customize it for your end product or client project.",
  },
  {
    q: "Who handles checkout?",
    a: "Checkout is handled by Lemon Squeezy. Syleri Technologies does not process or store your payment details on this website.",
  },
];
