"""
STEP_111 — One Trillion 브랜드 자산 추출
3개 소스 이미지에서 헤더 로고·심볼·워드마크 crop + alpha 적용
"""
from PIL import Image
import numpy as np
import os

SRC_DIR = os.path.join(os.path.dirname(__file__), "../../Image/branding")
OUT_DIR = os.path.join(os.path.dirname(__file__), "../public")

os.makedirs(OUT_DIR, exist_ok=True)


def get_content_bbox(img_rgba, threshold=230):
    """흰 배경이 아닌 픽셀의 bbox 반환 (padding 포함)"""
    arr = np.array(img_rgba.convert("RGB"))
    mask = (arr[:, :, 0] < threshold) | (arr[:, :, 1] < threshold) | (arr[:, :, 2] < threshold)
    rows = np.any(mask, axis=1)
    cols = np.any(mask, axis=0)
    if not rows.any():
        return None
    rmin, rmax = np.where(rows)[0][[0, -1]]
    cmin, cmax = np.where(cols)[0][[0, -1]]
    pad = 20
    h, w = arr.shape[:2]
    return (max(0, cmin - pad), max(0, rmin - pad), min(w, cmax + pad + 1), min(h, rmax + pad + 1))


def make_transparent(img, threshold=245):
    """흰 배경 픽셀을 alpha=0 으로 변환"""
    img = img.convert("RGBA")
    data = np.array(img)
    r, g, b = data[:, :, 0], data[:, :, 1], data[:, :, 2]
    white_mask = (r >= threshold) & (g >= threshold) & (b >= threshold)
    data[:, :, 3] = np.where(white_mask, 0, 255)
    return Image.fromarray(data, "RGBA")


def find_vertical_divider(img_arr, search_start_ratio=0.2, search_end_ratio=0.8):
    """수직 구분선 x 위치 탐색 (흰색에 가까운 세로줄)"""
    h, w = img_arr.shape[:2]
    x_start = int(w * search_start_ratio)
    x_end = int(w * search_end_ratio)

    col_darkness = []
    for x in range(x_start, x_end):
        col = img_arr[:, x, :3]
        darkness = np.mean((col[:, 0] < 200) | (col[:, 1] < 200) | (col[:, 2] < 200))
        col_darkness.append(darkness)

    # 가장 어두운 컬럼 = 구분선
    divider_x = x_start + int(np.argmax(col_darkness))
    return divider_x


# ─── Phase 1.1: 메인 lockup → logo-one-trillion.png ──────────────────────────
print("[1/3] 메인 lockup crop → logo-one-trillion.png")
main_src = Image.open(f"{SRC_DIR}/메인 (심볼 + 워드마크).png")
main_arr = np.array(main_src.convert("RGB"))
h, w = main_arr.shape[:2]

# 두 lockup 사이 빈 gap 탐지 → 우측 lockup 시작점 찾기
main_arr_rgb = np.array(main_src.convert("RGB"))
# 큰 심볼 끝 이후(x=400+)에서 첫 번째 empty gap → gap 이후 첫 콘텐츠 = 우측 lockup 시작
gap_end = 600  # 기본값
in_gap = False
for x in range(400, w):
    col = main_arr_rgb[:, x, :]
    non_white = np.sum((col[:, 0] < 230) | (col[:, 1] < 230) | (col[:, 2] < 230))
    if non_white == 0 and not in_gap:
        in_gap = True
    elif non_white > 10 and in_gap:
        gap_end = x
        break
print(f"  right lockup start = {gap_end} / {w}")
right_region = main_src.crop((gap_end, 0, w, h))
bbox = get_content_bbox(right_region, threshold=230)
if bbox:
    right_cropped = right_region.crop(bbox)
else:
    right_cropped = right_region

logo = make_transparent(right_cropped)
logo.save(f"{OUT_DIR}/logo-one-trillion.png", "PNG", optimize=True)
print(f"  saved: logo-one-trillion.png {logo.size}")


# ─── Phase 1.2: 심볼 옵션2 (가운데) → logo-one-trillion-symbol.png ───────────
print("[2/3] 심볼 옵션2 crop → logo-one-trillion-symbol.png")
sym_src = Image.open(f"{SRC_DIR}/심볼만 (favicon·앱 아이콘용).png")
sym_arr = np.array(sym_src.convert("RGB"))
h_s, w_s = sym_arr.shape[:2]

# 좌우 3등분 후 가운데 (옵션2)
third = w_s // 3
mid_region = sym_src.crop((third, 0, third * 2, h_s))
bbox = get_content_bbox(mid_region, threshold=230)
if bbox:
    mid_cropped = mid_region.crop(bbox)
else:
    mid_cropped = mid_region

symbol = make_transparent(mid_cropped)

# 정사각형으로 패딩
sw, sh = symbol.size
square_size = max(sw, sh)
square = Image.new("RGBA", (square_size, square_size), (255, 255, 255, 0))
square.paste(symbol, ((square_size - sw) // 2, (square_size - sh) // 2))

square.save(f"{OUT_DIR}/logo-one-trillion-symbol.png", "PNG", optimize=True)
print(f"  saved: logo-one-trillion-symbol.png {square.size}")


# ─── Phase 1.3: 워드마크 "One Trillion" 좌측 → logo-one-trillion-wordmark.png
print("[3/3] 워드마크 crop → logo-one-trillion-wordmark.png")
wm_src = Image.open(f"{SRC_DIR}/워드마크만 (텍스트 로고).png")
wm_arr = np.array(wm_src.convert("RGB"))
h_w, w_w = wm_arr.shape[:2]

# 수직 구분선 ("|") 위치 탐색
divider_x_wm = find_vertical_divider(wm_arr, search_start_ratio=0.35, search_end_ratio=0.65)
print(f"  divider x = {divider_x_wm} / {w_w}")

# "One Trillion" 좌측 crop
left_region = wm_src.crop((0, 0, divider_x_wm - 10, h_w))
bbox = get_content_bbox(left_region, threshold=230)
if bbox:
    left_cropped = left_region.crop(bbox)
else:
    left_cropped = left_region

wordmark = make_transparent(left_cropped)
wordmark.save(f"{OUT_DIR}/logo-one-trillion-wordmark.png", "PNG", optimize=True)
print(f"  saved: logo-one-trillion-wordmark.png {wordmark.size}")

print("\n✅ Phase 1 완료 — 3 자산 생성")
for f in ["logo-one-trillion.png", "logo-one-trillion-symbol.png", "logo-one-trillion-wordmark.png"]:
    path = f"{OUT_DIR}/{f}"
    im = Image.open(path)
    print(f"  {f}: {im.size} {im.mode}")
