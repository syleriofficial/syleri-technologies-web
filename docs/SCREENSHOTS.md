# Stockline screenshots

The Stockline sales page, the home page and the products page use **real
screenshots only**, captured from the unmodified `syleriofficial/stockline-demo`
production build with `scripts/capture-stockline-screenshots.py`. If a file is
ever missing, the site renders a labelled "Screenshot pending" frame in its
place — never a mock UI.

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
| 8 | `08-dark-mode.png`         | Dashboard, dark theme                     | Stockline themes                         |

## Readable crops

Phones and narrow figure slots show a crop of a capture instead of the whole
screen shrunk to fit. Crops live in `screenshots/crops/` and are cut from the
files above by:

```
python3 scripts/crop-stockline-screenshots.py
```

The crop regions are listed at the top of that script. Re-run it whenever a
source capture is replaced, and check the crop still shows what its `alt`
text in `media.ts` says.

## Capture guidelines

- Capture from the real Stockline production build at a **1600×1000** browser
  viewport with a device pixel ratio of 1.8 (output **2880×1800**, 16:10).
  Frames crop from the top, so keep important UI near the top.
- POS: several products in the cart so subtotal, tax and total are visible.
- Light theme for 1–7, dark theme for 8.
- Browser chrome cropped out; no personal data, real customer data or
  private URLs visible.
- PNG is fine — Next.js serves optimized AVIF/WebP automatically.
- If a screenshot shows something different from the description, update its
  `alt` text in `src/content/products/stockline/media.ts`.

After adding files, rebuild (`npm run build`) — detection happens at build time.
