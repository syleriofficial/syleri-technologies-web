/**
 * Company-level content shared by the home and company pages.
 * Keep every statement factual: no scale, customers, history or awards.
 */

export const companyStatement = {
  /** Home hero headline. Two sentences; the page breaks the line between them on wide screens. */
  headline: ["Start with the interface.", "Build the rest your way."],
  /** Home hero supporting copy. */
  lead: "Syleri Technologies builds frontend foundations for business applications. Stockline is a Next.js POS and inventory dashboard starter kit, with working interface screens you can explore before buying.",
};

/**
 * "How we work": each statement is something a visitor can check, linked to
 * the evidence. `link` names which product resource the statement points to;
 * pages resolve it from the product record so the link never goes stale.
 */
export const workStatements: { body: string; link: "demo" | "not-included" | "release-notes" }[] = [
  { body: "Every screen is open in a live demo.", link: "demo" },
  { body: "Each product page lists what it doesn’t include.", link: "not-included" },
  { body: "Every release is written up with what changed.", link: "release-notes" },
];

/** Engineering standards every release is held to (company page). */
export const engineeringPrinciples = [
  {
    title: "Typed and maintainable",
    body: "TypeScript, consistent structure and readable code, so products stay safe to change as they grow.",
  },
  {
    title: "Accessible baseline",
    body: "Semantic markup, keyboard support and readable contrast are requirements of a finished product.",
  },
  {
    title: "Few dependencies",
    body: "Well-maintained, widely used libraries — and nothing a product does not need.",
  },
  {
    title: "Fast by default",
    body: "Quick loading and responsive interfaces are part of the work, not a pass at the end.",
  },
];
