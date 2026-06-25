from pathlib import Path
from PIL import Image, ImageEnhance, ImageOps

ROOT = Path(r"C:\Users\CodeS\Documents\Codex\2026-06-16\create-a-new-website-for-https")
ASSETS = ROOT / "outputs" / "assets"


def make_icon(source_path, output_path, size, background=(244, 239, 227)):
    source = Image.open(source_path).convert("RGB")
    source = ImageOps.exif_transpose(source)
    canvas = Image.new("RGB", (size, size), background)
    inset = int(size * 0.09)
    fitted = ImageOps.contain(source, (size - inset * 2, size - inset * 2), Image.Resampling.LANCZOS)
    canvas.paste(fitted, ((size - fitted.width) // 2, (size - fitted.height) // 2))
    canvas.save(output_path, "PNG", optimize=True)


def make_mobile_hero(source_path, output_path):
    source = Image.open(source_path).convert("RGB")
    source = ImageOps.exif_transpose(source)
    width, height = 900, 1400
    canvas = Image.new("RGB", (width, height), (8, 10, 12))

    # Scale the desktop cover wider than the phone canvas so the car still feels present,
    # then place it low with a dark top area for readable centred text.
    scaled_width = 1180
    scaled_height = round(source.height * (scaled_width / source.width))
    car = source.resize((scaled_width, scaled_height), Image.Resampling.LANCZOS)
    car = ImageEnhance.Brightness(car).enhance(0.78)
    x = (width - scaled_width) // 2
    y = height - scaled_height - 18
    canvas.paste(car, (x, y))

    top = Image.new("RGBA", (width, height), (8, 10, 12, 0))
    for row in range(height):
        if row < 760:
            alpha = 230 - int(row * 0.12)
        else:
            alpha = max(45, 165 - int((row - 760) * 0.12))
        Image.Image.paste(top, (8, 10, 12, max(0, min(230, alpha))), (0, row, width, row + 1))
    merged = Image.alpha_composite(canvas.convert("RGBA"), top).convert("RGB")
    merged.save(output_path, "JPEG", quality=82, optimize=True, progressive=True)


logo = ASSETS / "tuned-performance-logo-cropped.jpg"
make_icon(logo, ASSETS / "app-icon-192.png", 192)
make_icon(logo, ASSETS / "app-icon-512.png", 512)
make_icon(logo, ASSETS / "apple-touch-icon.png", 180)
make_mobile_hero(ASSETS / "hero-bmw-m3-dark.jpg", ASSETS / "hero-bmw-m3-mobile.jpg")

for name in ["app-icon-192.png", "app-icon-512.png", "apple-touch-icon.png", "hero-bmw-m3-mobile.jpg"]:
    path = ASSETS / name
    print(f"{name}: {path.stat().st_size} bytes")
