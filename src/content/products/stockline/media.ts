import type { ProductMedia } from "../types";

/**
 * Stockline screenshots. Real captures only — see docs/SCREENSHOTS.md.
 * Files live in public/products/stockline/screenshots/.
 */
// Every capture is 2880x1800 (1600x1000 CSS px at 1.8x) — see docs/SCREENSHOTS.md.
const shot = (file: string, alt: string, brief: string, mobile?: ProductMedia): ProductMedia => ({
  src: `/products/stockline/screenshots/${file}`,
  alt,
  brief,
  width: 2880,
  height: 1800,
  ...(mobile ? { mobile } : {}),
});

/**
 * A region of one of the captures above, cut by
 * scripts/crop-stockline-screenshots.py so the interface stays readable at
 * the size it is shown. Files live in screenshots/crops/.
 */
const crop = (file: string, width: number, height: number, alt: string, brief: string, mobile?: ProductMedia): ProductMedia => ({
  src: `/products/stockline/screenshots/crops/${file}`,
  alt,
  brief,
  width,
  height,
  ...(mobile ? { mobile } : {}),
});

const posCart = crop(
  "pos-cart.png",
  700,
  850,
  "Stockline POS current sale for a walk-in customer: five products, seven items in total, with quantities and prices",
  "POS terminal, current-sale panel",
);

const dashboardKpi = crop(
  "dashboard-kpi.png",
  780,
  510,
  "Stockline dashboard cards: today’s revenue $453.82 and 9 low-stock products needing reordering",
  "Dashboard cards, light theme",
);

const dashboardKpiDark = crop(
  "dashboard-kpi-dark.png",
  780,
  510,
  "The same Stockline dashboard cards in the dark theme",
  "Dashboard cards, dark theme",
);

const inventoryMobile = crop(
  "inventory-mobile.png",
  790,
  860,
  "Stockline inventory overview: active SKU count and the first rows of the stock table with SKU, product and warehouse",
  "Inventory screen, left side",
);

export const stocklineMedia = {
  pos: shot(
    "01-pos-cart.png",
    "Stockline POS terminal with seven items in the cart, showing subtotal, tax and total",
    "POS terminal with a filled cart",
    posCart,
  ),
  dashboard: shot(
    "02-dashboard-light.png",
    "Stockline dashboard in the light theme, with revenue, orders, gross profit and stock value cards above a 14-day sales and profit trend chart",
    "Dashboard, light theme",
  ),
  dashboardCards: crop(
    "dashboard-cards.png",
    1510,
    630,
    "Stockline dashboard cards: today’s revenue $453.82, 2 orders, gross profit $203.70, 4 units sold, 9 low-stock products, 1 out of stock and 3 purchase orders awaiting delivery",
    "Dashboard cards, light theme",
    dashboardKpi,
  ),
  dashboardCardsDark: crop(
    "dashboard-cards-dark.png",
    1510,
    630,
    "The same Stockline dashboard cards in the dark theme",
    "Dashboard cards, dark theme",
    dashboardKpiDark,
  ),
  inventory: shot("03-inventory.png", "Stockline inventory overview by warehouse", "Inventory screen"),
  inventoryTable: crop(
    "inventory.png",
    2410,
    1060,
    "Stockline inventory overview: totals for active SKUs, low stock, out of stock and stock value above a table of products by warehouse with on-hand, available, reserved and incoming quantities",
    "Inventory screen",
    inventoryMobile,
  ),
  products: shot("04-products.png", "Stockline products list with stock status", "Products screen"),
  purchasing: shot("05-purchasing.png", "Stockline purchase orders list", "Purchasing screen"),
  reports: shot("06-reports.png", "Stockline reports screen with sales and profit trend", "Reports screen"),
  roles: shot("07-roles-permissions.png", "Stockline roles and permissions matrix", "Roles & permissions screen"),
  dark: shot(
    "08-dark-mode.png",
    "Stockline dashboard in the dark theme, with revenue, orders, gross profit and stock value cards above a 14-day sales and profit trend chart",
    "Dashboard, dark theme",
  ),
} satisfies Record<string, ProductMedia>;
