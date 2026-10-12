/**
 * Company-level content shared by the home and company pages.
 * Keep every statement factual: no scale, customers, history or awards.
 */

export const companyStatement = {
  /** Home hero headline. */
  headline: "Technology products built to make complex work simpler.",
  /** Home hero supporting copy. */
  lead: "Syleri Technologies builds software, platforms and technology products — clear to use, clear to build on and honest about what they do.",
};

/** Product principles: how we decide what a product is and how we present it. */
export const productPrinciples = [
  {
    title: "Clear scope",
    body: "Every product states what it does and what it does not include, on its own page, before you buy.",
  },
  {
    title: "See it for yourself",
    body: "Live demos where possible and documentation with every release, so a product can be evaluated on the work itself.",
  },
  {
    title: "Simple to start",
    body: "A product should be useful from the first run, with sensible defaults and a structure that is easy to understand.",
  },
];

/** Engineering principles: the standard every release is held to. */
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
    title: "Restraint in dependencies",
    body: "Well-maintained, widely used libraries — and nothing a product does not need.",
  },
  {
    title: "Performance as a feature",
    body: "Fast loading and responsive interfaces are part of quality, not an optimization pass at the end.",
  },
];

/**
 * The four principles shown on the home page. The full set lives on the
 * company page.
 */
const HOME_PRINCIPLE_TITLES = ["Clear scope", "See it for yourself", "Accessible baseline", "Performance as a feature"];
const allPrinciples = [...productPrinciples, ...engineeringPrinciples];
export const homePrinciples = HOME_PRINCIPLE_TITLES.map((title) => allPrinciples.find((p) => p.title === title)).filter(
  (p): p is (typeof allPrinciples)[number] => p !== undefined,
);
