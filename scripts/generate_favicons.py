"""
STEP_111 — One Trillion favicon·앱 아이콘 다중 사이즈 생성
소스: public/logo-one-trillion-symbol.png (이미 정사각형 451x451)
"""
from PIL import Image
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), "../public")

src = Image.open(f"{OUT_DIR}/logo-one-trillion-symbol.png").convert("RGBA")
print(f"Source: {src.size} {src.mode}")

# 흰 배경 합성 (favicon.ico = 투명 미지원 브라우저 대비)
def on_white(img):
    bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
    bg.paste(img, mask=img.split()[3])
    return bg.convert("RGB")

# 투명 배경 유지 버전 (PNG용)
sizes_png = {
    "favicon-16.png": 16,
    "favicon-32.png": 32,
    "favicon-48.png": 48,
    "apple-touch-icon.png": 180,
    "icon-192.png": 192,
    "icon-512.png": 512,
}

for name, sz in sizes_png.items():
    img = on_white(src).resize((sz, sz), Image.LANCZOS)
    img.save(f"{OUT_DIR}/{name}", "PNG", optimize=True)
    print(f"  saved: {name} ({sz}x{sz})")

# .ico 다중 사이즈 (16·32·48)
ico_imgs = []
for sz in [16, 32, 48]:
    ico_imgs.append(on_white(src).resize((sz, sz), Image.LANCZOS))
ico_imgs[0].save(
    f"{OUT_DIR}/favicon.ico",
    format="ICO",
    append_images=ico_imgs[1:],
    sizes=[(16, 16), (32, 32), (48, 48)],
)
print(f"  saved: favicon.ico (16/32/48)")

print("\n✅ Phase 2 완료 — favicon 6 사이즈 + .ico")
