from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(r"C:\Users\CodeS\Documents\Codex\2026-06-16\create-a-new-website-for-https")
GEN = Path(r"C:\Users\CodeS\.codex\generated_images\019ed0d8-c310-7f11-9770-2daf06708192")
ASSETS = ROOT / "outputs" / "assets"


def fit_image(src, dest, size, quality=82, blur_boxes=None, contrast=1.02, brightness=0.95):
    img = Image.open(src).convert("RGB")
    img = ImageOps.exif_transpose(img)

    if blur_boxes:
        w, h = img.size
        for box in blur_boxes:
            rect = tuple(round(value) for value in (box[0] * w, box[1] * h, box[2] * w, box[3] * h))
            patch = img.crop(rect).filter(ImageFilter.GaussianBlur(14))
            patch = ImageEnhance.Brightness(patch).enhance(0.72)
            img.paste(patch, rect)

    img = ImageOps.fit(img, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Brightness(img).enhance(brightness)
    img.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)


fit_image(
    GEN / "ig_0461c5b41ff762ce016a31ab0985648191b172fa2bedd75e81.png",
    ASSETS / "tuned-car-lineup.jpg",
    (1600, 900),
    brightness=0.88,
)

service_sources = {
    "service-remap-photo.jpg": "ig_0461c5b41ff762ce016a31a88cd01c8191afa5263db1a88bed.png",
    "service-mot-photo.jpg": "ig_0461c5b41ff762ce016a31a84b0a848191a14eb536bc15536a.png",
    "service-fitment-photo.jpg": "ig_0461c5b41ff762ce016a31a805f7a48191ac0967d906981aaf.png",
    "service-diagnostics-photo.jpg": "ig_0461c5b41ff762ce016a31a7c8b9308191bb8394c8903edbef.png",
    "service-repair-photo.jpg": "ig_0461c5b41ff762ce016a31a78f2f40819183b7f1abe99a8d50.png",
}

for dest_name, src_name in service_sources.items():
    fit_image(
        GEN / src_name,
        ASSETS / dest_name,
        (1400, 875),
        quality=80,
        contrast=1.04,
        brightness=0.93,
    )

for image in ["tuned-car-lineup.jpg", *service_sources.keys()]:
    path = ASSETS / image
    print(f"{image}: {path.stat().st_size} bytes")
