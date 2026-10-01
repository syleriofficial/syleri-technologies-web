import type { ProductMedia } from "../types";

/**
 * Stockline screenshots. Real captures only — see docs/SCREENSHOTS.md.
 * Files live in public/products/stockline/screenshots/.
 */
const shot = (file: string, alt: string, brief: string): ProductMedia => ({
  src: `/products/stockline/screenshots/${file}`,
  alt,
  brief,
});

export const stocklineMedia = {
  pos: shot("01-pos-cart.png", "Stockline POS terminal with several items in the cart", "POS terminal with a filled cart"),
  dashboard: shot("02-dashboard-light.png", "Stockline dashboard in light theme", "Dashboard, light theme"),
  inventory: shot("03-inventory.png", "Stockline inventory screen", "Inventory screen"),
  products: shot("04-products.png", "Stockline products screen", "Products screen"),
  purchasing: shot("05-purchasing.png", "Stockline purchasing screen", "Purchasing screen"),
  reports: shot("06-reports.png", "Stockline reports screen", "Reports screen"),
  roles: shot("07-roles-permissions.png", "Stockline roles and permissions screen", "Roles & permissions screen"),
  dark: shot("08-dark-mode.png", "Stockline interface in dark theme", "Any primary screen in dark theme"),
} satisfies Record<string, ProductMedia>;
