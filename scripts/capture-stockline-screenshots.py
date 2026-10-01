"""Capture real Stockline screenshots from a locally running, unmodified
syleriofficial/stockline-demo production build (http://localhost:3200).
Output: 2880x1800 PNG (1600x1000 CSS px @1.8x, 16:10), page content only.

Usage: build and start the demo (`npm run build && npx next start -p 3200`
in the stockline-demo checkout), then run `python3 scripts/capture-stockline-screenshots.py`.
"""
import os
from playwright.sync_api import sync_playwright

BASE = os.environ.get("STOCKLINE_DEMO_URL", "http://localhost:3200")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "products", "stockline", "screenshots")

def settle(pg):
    pg.wait_for_load_state("networkidle")
    pg.evaluate("document.fonts.ready")
    pg.evaluate("document.activeElement && document.activeElement.blur()")
    pg.mouse.move(1599, 999)
    pg.wait_for_timeout(1200)  # chart entry animations

with sync_playwright() as p:
    b = p.chromium.launch()

    def page(theme):
        ctx = b.new_context(viewport={"width": 1600, "height": 1000}, device_scale_factor=1.8, color_scheme=theme)
        ctx.add_init_script(f"try{{localStorage.setItem('stockline-theme','{theme}')}}catch(e){{}}")
        pg = ctx.new_page()
        errs = []
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        pg.on("pageerror", lambda e: errs.append(str(e)))
        return ctx, pg, errs

    shots = [
        ("light", "/", "02-dashboard-light.png"),
        ("light", "/inventory", "03-inventory.png"),
        ("light", "/products", "04-products.png"),
        ("light", "/purchasing/orders", "05-purchasing.png"),
        ("light", "/reports", "06-reports.png"),
        ("light", "/administration/roles", "07-roles-permissions.png"),
        ("dark", "/", "08-dark-mode.png"),
    ]
    for theme, route, name in shots:
        ctx, pg, errs = page(theme)
        pg.goto(BASE + route)
        settle(pg)
        assert pg.evaluate("document.documentElement.dataset.theme") == theme
        pg.screenshot(path=f"{OUT}/{name}")
        print(name, route, theme, "console errors:", errs)
        ctx.close()

    # POS with a filled cart
    ctx, pg, errs = page("light")
    pg.goto(BASE + "/pos")
    pg.wait_for_load_state("networkidle")
    for name, times in [("Ridgeline Insulated Parka", 1), ("Northfield Daypack 22L", 2), ("Pinehurst Wool Beanie", 1), ("Kestrel Camp Mug 12oz", 2), ("Marlowe Leather Chelsea Boot", 1)]:
        tile = pg.locator("button", has_text=name).first
        for _ in range(times):
            tile.click()
            pg.wait_for_timeout(150)
    # Clicking tiles can scroll the page; return every scroller to the top.
    pg.evaluate("window.scrollTo(0, 0); document.querySelectorAll('*').forEach(e => { if (e.scrollTop) e.scrollTop = 0; })")
    settle(pg)
    print("scrollY:", pg.evaluate("window.scrollY"))
    totals = pg.evaluate("""() => {
      const t = document.body.innerText;
      const m = (k) => (t.match(new RegExp(k + '\\\\s*\\\\n?\\\\s*(\\\\$[\\\\d,]+\\\\.\\\\d\\\\d)')) || [])[1];
      return {subtotal: m('Subtotal'), tax: m('Tax'), total: m('Total')};
    }""")
    pg.screenshot(path=f"{OUT}/01-pos-cart.png")
    print("01-pos-cart.png /pos light", totals, "console errors:", errs)
    ctx.close()
    b.close()
