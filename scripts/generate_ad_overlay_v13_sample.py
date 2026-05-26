"""
v13 sample 박기 (인물 가운데 우측 밑 + 진짜 변호사 배지 PNG)
- 1 PNG 박힘 = AD001-seoul-p1.png (서울 신용·가계대출 여성)
- 사장 박은 변호사 배지 SVG → PNG 박힘
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import numpy as np

HOME = Path("/sessions/stoic-zealous-mendel/mnt")
INPUT_DIR = HOME / "OTMarketing/Image/01_debt_relief/광고주_법률사무소보광"
FONT_DIR = HOME / "OTMarketing/ot-marketing-source/scripts/fonts"
BADGE_PNG = INPUT_DIR / "_assets/변호사_뱃지_filled.png"  # ⭐ 금색 채운 박힌 진짜 박힘
OUT_PATH = HOME / "OTMarketing/Image/01_debt_relief/광고주_법률사무소보광/_v13_sample/AD001-seoul-p1-v13.png"
OUT_PATH.parent.mkdir(parents=True, exist_ok=True)

# 폰트
FONT_HEAD = ImageFont.truetype(str(FONT_DIR / "Pretendard-ExtraBold.otf"), 92)
FONT_SUB = ImageFont.truetype(str(FONT_DIR / "Pretendard-Bold.otf"), 56)
FONT_LAW_FIRM = ImageFont.truetype(str(FONT_DIR / "Pretendard-Bold.otf"), 56)  # 옵션 4: CTA 56px 매칭 (라인 통일)

# 색상
WHITE = (255, 255, 255, 255)
CORAL = (252, 165, 165, 255)
BLACK_STROKE = (0, 0, 0, 230)

W, H = 1080, 1350

# v12 그대로
BASE_FILE = "ad_v4_debtor_p1_credit-loan_woman.png"
LINE1_PARTS = [("신용·가계대출", WHITE), ("압류", CORAL)]
LINE2_TEXT = "빠른 해제 가능"
SUB_TEXT = "서울 거주자 탕감액 확인"

# v13 박힘
LAW_FIRM = "법률사무소 보광"
BADGE_SIZE = 50  # 옵션 1: 텍스트 매칭 (옛 90 → 50)


def apply_gradient(img):
    alpha_arr = np.zeros((H, W), dtype=np.uint8)
    top_zone = int(H * 0.30)
    top_alphas = (180 * (1 - np.arange(top_zone) / top_zone)).astype(np.uint8)
    alpha_arr[:top_zone, :] = top_alphas[:, np.newaxis]
    bot_zone_start = int(H * 0.65)
    bot_len = H - bot_zone_start
    bot_progress = np.arange(bot_len) / bot_len
    bot_alphas = (200 * bot_progress).astype(np.uint8)
    alpha_arr[bot_zone_start:, :] = bot_alphas[:, np.newaxis]
    gradient_arr = np.zeros((H, W, 4), dtype=np.uint8)
    gradient_arr[:, :, 3] = alpha_arr
    gradient = Image.fromarray(gradient_arr, mode="RGBA")
    return Image.alpha_composite(img, gradient)


def draw_multi_color(draw, parts, xy, font, stroke_width=2):
    x, y = xy
    for i, (text, color) in enumerate(parts):
        draw.text((x, y), text, font=font, fill=color, stroke_width=stroke_width, stroke_fill=BLACK_STROKE)
        bbox = draw.textbbox((x, y), text, font=font, stroke_width=stroke_width)
        x = bbox[2]
        if i < len(parts) - 1:
            space_bbox = draw.textbbox((0, 0), " ", font=font)
            x += (space_bbox[2] - space_bbox[0])


def draw_lawyer_badge_with_text(img, anchor_y, align="left"):
    """v13 = 진짜 변호사 배지 PNG + 사무소명 박기 (좌측·우측 박힘)"""
    badge = Image.open(BADGE_PNG).convert("RGBA")
    badge = badge.resize((BADGE_SIZE, BADGE_SIZE), Image.LANCZOS)

    tmp_draw = ImageDraw.Draw(img)
    bbox_text = tmp_draw.textbbox((0, 0), LAW_FIRM, font=FONT_LAW_FIRM, stroke_width=2)
    text_w = bbox_text[2] - bbox_text[0]
    text_h = bbox_text[3] - bbox_text[1]

    GAP = 14
    total_w = BADGE_SIZE + GAP + text_w

    # 좌측 박힘 (옵션 4) 또는 우측 박힘 (옵션 1)
    if align == "left":
        LEFT_PAD = 60
        badge_x = LEFT_PAD
        text_x = LEFT_PAD + BADGE_SIZE + GAP
    else:
        RIGHT_PAD = 50
        start_x = W - RIGHT_PAD - total_w
        badge_x = start_x
        text_x = start_x + BADGE_SIZE + GAP

    badge_y_center = anchor_y + BADGE_SIZE // 2
    text_y = badge_y_center - text_h // 2 - bbox_text[1]

    img.paste(badge, (badge_x, anchor_y), badge)

    draw = ImageDraw.Draw(img)
    draw.text(
        (text_x, text_y), LAW_FIRM, font=FONT_LAW_FIRM,
        fill=WHITE, stroke_width=2, stroke_fill=BLACK_STROKE
    )


def main():
    base_path = INPUT_DIR / BASE_FILE
    src = Image.open(base_path).convert("RGBA")
    ratio_w = W / src.width
    new_h = int(src.height * ratio_w)
    src = src.resize((W, new_h), Image.LANCZOS)
    if new_h > H:
        top = (new_h - H) // 2
        src = src.crop((0, top, W, top + H))
    elif new_h < H:
        new_img = Image.new("RGBA", (W, H), (0, 0, 0, 255))
        new_img.paste(src, (0, (H - new_h) // 2))
        src = new_img

    src_orig = src.copy()  # 박스 박힌 자리 박힘 = 원본 박힌 박힘 박힘 박힘
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    img.paste(src, (0, 0))
    img = apply_gradient(img)
    draw = ImageDraw.Draw(img)

    # 상단 헤드라인 (v12 그대로)
    LEFT_PAD = 60
    TOP_PAD = 70
    draw_multi_color(draw, LINE1_PARTS, (LEFT_PAD, TOP_PAD), FONT_HEAD)
    line1_full = " ".join([t for t, _ in LINE1_PARTS])
    bbox1 = draw.textbbox((0, 0), line1_full, font=FONT_HEAD, stroke_width=2)
    h1 = bbox1[3] - bbox1[1]
    draw.text((LEFT_PAD, TOP_PAD + h1 + 16), LINE2_TEXT,
              font=FONT_HEAD, fill=WHITE, stroke_width=2, stroke_fill=BLACK_STROKE)

    # ⭐ v13 옵션 4: 좌측 하단 박힘 (사무소명 ↔ CTA 박힌 gap ↑ 박힘)
    # CTA 박스 위쪽 = ~1036 박힘
    # 사무소명 박힌 끝 = anchor_y + 50
    # gap 박힘 = ~80px 박힘 = anchor_y = 1036 - 50 - 80 = 906 박힘
    draw_lawyer_badge_with_text(img, anchor_y=906, align="left")
    draw = ImageDraw.Draw(img)

    # ⭐ 하단 CTA 박스 박기 (미세 불투명 박힘 + 코랄 아웃라인 = 클릭 신호)
    bbox_sub = draw.textbbox((0, 0), SUB_TEXT, font=FONT_SUB, stroke_width=2)
    text_w = bbox_sub[2] - bbox_sub[0]
    h_sub = bbox_sub[3] - bbox_sub[1]
    BOTTOM_PAD = 240
    PAD_X = 28
    PAD_Y = 18
    box_w = text_w + PAD_X * 2
    box_h = h_sub + PAD_Y * 2
    box_x = LEFT_PAD
    box_y = H - BOTTOM_PAD - box_h + PAD_Y  # 옛 텍스트 자리 매칭

    # ⭐ 박스 박힌 자리 = 원본 인물 박힌 박힘 박기 (그라디언트 박힘 X = 박힘 투명)
    crop = src_orig.crop((box_x, box_y, box_x + box_w, box_y + box_h))
    img.paste(crop, (box_x, box_y))
    draw = ImageDraw.Draw(img)  # paste 후 draw 박기

    # 박스 박기 (둥근 박스 = 투명 + 흰 아웃라인 ⭐ 사장 결정)
    BOX_OUTLINE = (255, 255, 255, 255)  # 흰
    draw.rounded_rectangle(
        [(box_x, box_y), (box_x + box_w, box_y + box_h)],
        radius=14,
        fill=None,  # 박힘 X = 박힘 투명
        outline=BOX_OUTLINE,
        width=3
    )
    # 텍스트 박기 (박스 안 가운데 박힘)
    text_x = box_x + PAD_X
    text_y = box_y + PAD_Y - bbox_sub[1]
    draw.text((text_x, text_y), SUB_TEXT,
              font=FONT_SUB, fill=WHITE, stroke_width=2, stroke_fill=BLACK_STROKE)

    # 저장
    img.convert("RGB").save(OUT_PATH, "PNG", quality=95)
    print(f"✅ v13 sample 박힘: {OUT_PATH}")


if __name__ == "__main__":
    main()
