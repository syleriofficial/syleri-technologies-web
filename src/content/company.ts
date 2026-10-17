/**
 * Company-level content shared by the home and company pages.
 * Keep every statement factual: no scale, customers, history or awards.
 */

export const companyStatement = {
  /** Home hero headline. Two sentences; the page breaks the line between them on wide screens. */
  headline: ["Start with the interface.", "Build the rest your way."],
  /**
   * Home hero supporting copy: the company, in terms that hold as the catalog
   * grows. While there is a single product, the page adds one factual
   * sentence about it from its record (`pitch`).
   */
  lead: "Syleri Technologies builds software, platforms and technology products, and releases each one when it is ready to be relied on.",
};

/**
 * "How we work": each statement is something a visitor can check, linked to
 * the evidence. `link` names which product resource the statement points to;
 * pages resolve it from the product record so the link never goes stale.
 */
export const workStatements: { body: string; link: "demo" | "scope" | "release-notes" }[] = [
  { body: "Where a product has a live demo, you can try it before you buy.", link: "demo" },
  { body: "Each product page states what it does and doesn’t include.", link: "scope" },
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
