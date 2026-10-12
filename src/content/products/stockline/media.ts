import type { ProductMedia } from "../types";

/**
 * Stockline screenshots. Real captures only — see docs/SCREENSHOTS.md.
 * Files live in public/products/stockline/screenshots/.
 */
// Every capture is 2880x1800 (1600x1000 CSS px at 1.8x) — see docs/SCREENSHOTS.md.
const shot = (file: string, alt: string, brief: string): ProductMedia => ({
  src: `/products/stockline/screenshots/${file}`,
  alt,
  brief,
  width: 2880,
  height: 1800,
});

export const stocklineMedia = {
  pos: shot("01-pos-cart.png", "Stockline POS terminal with seven items in the cart, showing subtotal, tax and total", "POS terminal with a filled cart"),
  dashboard: shot(
    "02-dashboard-light.png",
    "Stockline dashboard in the light theme, with revenue, orders, gross profit and stock value cards above a 14-day sales and profit trend chart",
    "Dashboard, light theme",
  ),
  inventory: shot("03-inventory.png", "Stockline inventory overview by warehouse", "Inventory screen"),
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
