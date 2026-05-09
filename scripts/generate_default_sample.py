"""
Default sample 5 PNG 박기 (placeholder 박힘)
- 사무소명 = "법률사무소 **" 박힘 (새 광고주 박힐 자리)
- 광역 = "** 거주자 탕감액 확인" 박힘 (새 광역 박힐 자리)
- v13 디자인 박힘 = 영구 자산 박힘
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import numpy as np

HOME = Path.home()
DEFAULT_DIR = HOME / "OTMarketing/Image/01_debt_relief/Default"
BASE_DIR = DEFAULT_DIR / "base"
SAMPLE_DIR = DEFAULT_DIR / "sample"
ASSETS_DIR = DEFAULT_DIR / "_assets"
FONT_DIR = HOME / "OTMarketing/ot-marketing-source/scripts/fonts"
BADGE_PNG = ASSETS_DIR / "변호사_뱃지_filled.png"

# 폰트
FONT_HEAD = ImageFont.truetype(str(FONT_DIR / "Pretendard-ExtraBold.otf"), 92)
FONT_SUB = ImageFont.truetype(str(FONT_DIR / "Pretendard-Bold.otf"), 56)
FONT_LAW_FIRM = ImageFont.truetype(str(FONT_DIR / "Pretendard-Bold.otf"), 56)

# 색상
WHITE = (255, 255, 255, 255)
CORAL = (252, 165, 165, 255)
BLACK_STROKE = (0, 0, 0, 230)

W, H = 1080, 1350
LAW_FIRM = "법률사무소 **"  # ⭐ placeholder 박힘
BADGE_SIZE = 50

# 5 base + 헤드라인 (광역 = ** placeholder 박힘)
BASE_IMAGES = [
    ("p1", "ad_v4_debtor_p1_credit-loan_woman.png", [("신용·가계대출", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
    ("p2", "ad_v4_debtor_p2_stock-coin_man.png", [("주식·코인 손실", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
    ("p3", "ad_v4_debtor_p3_salary-seizure_man.png", [("월급", WHITE), ("압류", CORAL), ("받고 계신가요", WHITE)], "빠른 해제 가능"),
    ("p4", "ad_v4_debtor_p4_collateral_woman.png", [("집·전세 담보", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
    ("p5", "ad_v4_debtor_p5_self-employed_man.png", [("사업 실패 부채", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
]


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


def draw_lawyer_badge_with_text(img, anchor_y):
    badge = Image.open(BADGE_PNG).convert("RGBA")
    badge = badge.resize((BADGE_SIZE, BADGE_SIZE), Image.LANCZOS)

    tmp_draw = ImageDraw.Draw(img)
    bbox_text = tmp_draw.textbbox((0, 0), LAW_FIRM, font=FONT_LAW_FIRM, stroke_width=2)
    text_w = bbox_text[2] - bbox_text[0]
    text_h = bbox_text[3] - bbox_text[1]

    GAP = 14
    LEFT_PAD = 60
    badge_x = LEFT_PAD
    text_x = LEFT_PAD + BADGE_SIZE + GAP

    badge_y_center = anchor_y + BADGE_SIZE // 2
    text_y = badge_y_center - text_h // 2 - bbox_text[1]

    img.paste(badge, (badge_x, anchor_y), badge)

    draw = ImageDraw.Draw(img)
    draw.text(
        (text_x, text_y), LAW_FIRM, font=FONT_LAW_FIRM,
        fill=WHITE, stroke_width=2, stroke_fill=BLACK_STROKE
    )


def generate_default_sample(base_id, base_filename, line1_parts, line2_text):
    base_path = BASE_DIR / base_filename
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

    src_orig = src.copy()
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    img.paste(src, (0, 0))
    img = apply_gradient(img)
    draw = ImageDraw.Draw(img)

    LEFT_PAD = 60
    TOP_PAD = 70
    draw_multi_color(draw, line1_parts, (LEFT_PAD, TOP_PAD), FONT_HEAD)
    line1_full = " ".join([t for t, _ in line1_parts])
    bbox1 = draw.textbbox((0, 0), line1_full, font=FONT_HEAD, stroke_width=2)
    h1 = bbox1[3] - bbox1[1]
    draw.text((LEFT_PAD, TOP_PAD + h1 + 16), line2_text,
              font=FONT_HEAD, fill=WHITE, stroke_width=2, stroke_fill=BLACK_STROKE)

    # 변호사 배지 + 사무소명 박힘 (placeholder)
    draw_lawyer_badge_with_text(img, anchor_y=906)
    draw = ImageDraw.Draw(img)

    # CTA 박스 박힘 (광역 = ** placeholder)
    sub_text = "** 거주자 탕감액 확인"  # ⭐ placeholder 박힘
    bbox_sub = draw.textbbox((0, 0), sub_text, font=FONT_SUB, stroke_width=2)
    text_w = bbox_sub[2] - bbox_sub[0]
    h_sub = bbox_sub[3] - bbox_sub[1]
    BOTTOM_PAD = 240
    PAD_X = 28
    PAD_Y = 18
    box_w = text_w + PAD_X * 2
    box_h = h_sub + PAD_Y * 2
    box_x = LEFT_PAD
    box_y = H - BOTTOM_PAD - box_h + PAD_Y

    crop = src_orig.crop((box_x, box_y, box_x + box_w, box_y + box_h))
    img.paste(crop, (box_x, box_y))
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle(
        [(box_x, box_y), (box_x + box_w, box_y + box_h)],
        radius=14,
        fill=None,
        outline=(255, 255, 255, 255),
        width=3
    )
    text_x = box_x + PAD_X
    text_y = box_y + PAD_Y - bbox_sub[1]
    draw.text((text_x, text_y), sub_text,
              font=FONT_SUB, fill=WHITE, stroke_width=2, stroke_fill=BLACK_STROKE)

    out_path = SAMPLE_DIR / f"default-{base_id}.png"
    img.convert("RGB").save(out_path, "PNG", quality=95)
    print(f"✅ {out_path.name}")


def main():
    SAMPLE_DIR.mkdir(parents=True, exist_ok=True)
    for base_id, base_filename, line1_parts, line2_text in BASE_IMAGES:
        generate_default_sample(base_id, base_filename, line1_parts, line2_text)
    print(f"\n✅ Default sample 5 PNG 박힘")


if __name__ == "__main__":
    main()
