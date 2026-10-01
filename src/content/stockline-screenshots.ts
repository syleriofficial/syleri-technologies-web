import fs from "node:fs";
import path from "node:path";

/**
 * Stockline screenshot manifest.
 *
 * Only real screenshots of Stockline may be used. Drop each PNG into
 * `public/products/stockline/screenshots/` using the exact file name below
 * (recommended: 2560×1600, 16:10, captured from the actual product). The
 * site detects the file at build time; until it exists, a clearly labelled
 * placeholder frame is rendered instead — never a mock UI.
 */

export type ScreenshotKey =
  | "pos"
  | "dashboard"
  | "inventory"
  | "products"
  | "purchasing"
  | "reports"
  | "roles"
  | "dark";

type ScreenshotSpec = {
  file: string;
  alt: string;
  /** What the screenshot must show — used in the placeholder and docs. */
  brief: string;
};

export const screenshotSpecs: Record<ScreenshotKey, ScreenshotSpec> = {
  pos: {
    file: "01-pos-cart.png",
    alt: "Stockline POS terminal with several items in the cart",
    brief: "POS terminal with a filled cart",
  },
  dashboard: {
    file: "02-dashboard-light.png",
    alt: "Stockline dashboard in light theme",
    brief: "Dashboard, light theme",
  },
  inventory: {
    file: "03-inventory.png",
    alt: "Stockline inventory screen",
    brief: "Inventory screen",
  },
  products: {
    file: "04-products.png",
    alt: "Stockline products screen",
    brief: "Products screen",
  },
  purchasing: {
    file: "05-purchasing.png",
    alt: "Stockline purchasing screen",
    brief: "Purchasing screen",
  },
  reports: {
    file: "06-reports.png",
    alt: "Stockline reports screen",
    brief: "Reports screen",
  },
  roles: {
    file: "07-roles-permissions.png",
    alt: "Stockline roles and permissions screen",
    brief: "Roles & permissions screen",
  },
  dark: {
    file: "08-dark-mode.png",
    alt: "Stockline interface in dark theme",
    brief: "Any primary screen in dark theme",
  },
};

export const SCREENSHOT_DIR = "/products/stockline/screenshots";

export type ResolvedScreenshot = ScreenshotSpec & {
  key: ScreenshotKey;
  src: string;
  available: boolean;
};

export function getScreenshot(key: ScreenshotKey): ResolvedScreenshot {
  const spec = screenshotSpecs[key];
  const src = `${SCREENSHOT_DIR}/${spec.file}`;
  const available = fs.existsSync(path.join(process.cwd(), "public", src));
  return { ...spec, key, src, available };
}
