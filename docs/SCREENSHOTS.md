# Stockline screenshots

The Stockline sales page, the home page and the products page use **real
screenshots only**. Until each file below exists, the site renders a clearly
labelled "Screenshot pending" frame in its place — never a mock UI.

Put the files in:

```
public/products/stockline/screenshots/
```

| # | File name                  | What it must show                         | Used on                                  |
|---|----------------------------|-------------------------------------------|------------------------------------------|
| 1 | `01-pos-cart.png`          | POS terminal with a filled cart           | Home & /products (cover), Stockline POS  |
| 2 | `02-dashboard-light.png`   | Dashboard, light theme                    | Stockline Dashboard                      |
| 3 | `03-inventory.png`         | Inventory screen                          | Stockline modules                        |
| 4 | `04-products.png`          | Products screen                           | Stockline modules                        |
| 5 | `05-purchasing.png`        | Purchasing screen                         | Stockline modules                        |
| 6 | `06-reports.png`           | Reports screen                            | Stockline modules                        |
| 7 | `07-roles-permissions.png` | Roles & permissions screen                | Stockline modules                        |
| 8 | `08-dark-mode.png`         | Any primary screen in the dark theme      | Stockline themes                         |

## Capture guidelines

- Capture from the real Stockline build at a **1440×900** browser viewport
  with a device pixel ratio of 2 (output **2880×1800**, 16:10). Frames are
  16:10 and crop from the top, so keep important UI near the top.
- Light theme for 1–7, dark theme for 8.
- Browser chrome cropped out; no personal data, real customer data or
  private URLs visible.
- PNG is fine — Next.js serves optimized AVIF/WebP automatically.
- If a screenshot shows something different from the description, update its
  `alt` text in `src/content/products/stockline/media.ts`.

After adding files, rebuild (`npm run build`) — detection happens at build time.
