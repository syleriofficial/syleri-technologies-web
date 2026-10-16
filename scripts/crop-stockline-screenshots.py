"""Cut the readable crops used on the site from the real Stockline captures.

Every crop is a region of an unmodified screenshot in
public/products/stockline/screenshots/ (see docs/SCREENSHOTS.md). Crops let
small screens show part of a screen at a readable size instead of the whole
2880x1800 capture shrunk to phone width.

Usage (needs Pillow, a development-only tool, not a site dependency):

    python3 scripts/crop-stockline-screenshots.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "public/products/stockline/screenshots"
OUT = ROOT / "crops"

# name: (source file, (left, top, right, bottom) in source pixels)
CROPS = {
    "pos-cart": ("01-pos-cart.png", (2140, 250, 2840, 1100)),
    "dashboard-cards": ("02-dashboard-light.png", (470, 130, 1980, 760)),
    "dashboard-cards-dark": ("08-dark-mode.png", (470, 130, 1980, 760)),
    "dashboard-kpi": ("02-dashboard-light.png", (470, 250, 1250, 760)),
    "dashboard-kpi-dark": ("08-dark-mode.png", (470, 250, 1250, 760)),
    "inventory": ("03-inventory.png", (470, 120, 2880, 1180)),
    "inventory-mobile": ("03-inventory.png", (470, 140, 1260, 1000)),
}


def main() -> None:
    OUT.mkdir(exist_ok=True)
    for name, (source, box) in CROPS.items():
        image = Image.open(ROOT / source).convert("RGB").crop(box)
        image.save(OUT / f"{name}.png", optimize=True)
        print(f"{name}.png  {image.size[0]}x{image.size[1]}")


if __name__ == "__main__":
    main()
