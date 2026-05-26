"""
STEP_85.8 — 광고 이미지 v11 (하단 텍스트 위치 ↑ Meta 카드 충돌 fix)
- 5 base × 14 캠페인 = 70 PNG
- v10 → v11 변경: 하단 패딩 80 → 240 + 그라디언트 25% → 35%
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

HOME = Path.home()
INPUT_DIR = HOME / "OTMarketing/Image/01_debt_relief/광고주_법률사무소보광"
FONT_DIR = HOME / "OTMarketing/ot-marketing-source/scripts/fonts"

# 폰트 (v10 동일)
FONT_HEAD = ImageFont.truetype(str(FONT_DIR / "Pretendard-ExtraBold.otf"), 92)
FONT_SUB = ImageFont.truetype(str(FONT_DIR / "Pretendard-Bold.otf"), 56)

# 색상 (v10 동일)
WHITE = (255, 255, 255, 255)
CORAL = (252, 165, 165, 255)
BLACK_STROKE = (0, 0, 0, 230)

W, H = 1080, 1350

# 5 base + 헤드라인 (STEP_85.7 그대로)
BASE_IMAGES = [
    ("p1", "ad_v4_debtor_p1_credit-loan_woman.png", [("신용·가계대출", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
    ("p2", "ad_v4_debtor_p2_stock-coin_man.png", [("주식·코인 손실", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
    ("p3", "ad_v4_debtor_p3_salary-seizure_man.png", [("월급", WHITE), ("압류", CORAL), ("받고 계신가요", WHITE)], "빠른 해제 가능"),
    ("p4", "ad_v4_debtor_p4_collateral_woman.png", [("집·전세 담보", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
    ("p5", "ad_v4_debtor_p5_self-employed_man.png", [("사업 실패 부채", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
]

CAMPAIGNS = [
    "seoul", "gyeonggi", "incheon", "busan",
    "daegu-gyeongbuk", "gwangju-jeonnam", "daejeon-sejong-chungnam",
    "chungbuk", "gyeongnam", "gyeonggi-bukbu",
    "ulsan", "jeonbuk", "gangwon", "jeju",
]


def apply_gradient(img):
    """v11 fix: 상단 30% + 하단 35% (옛 25% → 35%) 자연 어두움 — numpy 박아 빠르게"""
    import numpy as np
    alpha_arr = np.zeros((H, W), dtype=np.uint8)

    # 상단 30%
    top_zone = int(H * 0.30)
    top_alphas = (180 * (1 - np.arange(top_zone) / top_zone)).astype(np.uint8)
    alpha_arr[:top_zone, :] = top_alphas[:, np.newaxis]

    # 하단 35% (옛 25% → 35%)
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


def generate_one(base_id, base_filename, line1_parts, line2_text, campaign_id):
    base_path = INPUT_DIR / base_filename
    if not base_path.exists():
        print(f"⚠ base 없음: {base_path}")
        return False

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

    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    img.paste(src, (0, 0))
    img = apply_gradient(img)
    draw = ImageDraw.Draw(img)

    # 상단 헤드라인 (v10 동일)
    LEFT_PAD = 60
    TOP_PAD = 70
    draw_multi_color(draw, line1_parts, (LEFT_PAD, TOP_PAD), FONT_HEAD)

    line1_full = " ".join([t for t, _ in line1_parts])
    bbox1 = draw.textbbox((0, 0), line1_full, font=FONT_HEAD, stroke_width=2)
    h1 = bbox1[3] - bbox1[1]
    draw.text((LEFT_PAD, TOP_PAD + h1 + 16), line2_text,
              font=FONT_HEAD, fill=WHITE, stroke_width=2, stroke_fill=BLACK_STROKE)

    # ⭐ 하단 부속 (v11 fix: 80 → 240px = 위로 올림)
    SUB = "내 탕감액 무료 분석"
    bbox_sub = draw.textbbox((0, 0), SUB, font=FONT_SUB, stroke_width=2)
    h_sub = bbox_sub[3] - bbox_sub[1]
    BOTTOM_PAD = 240  # 옛 80 → 240 (Meta 카드 영역 위로 박힘)
    draw.text((LEFT_PAD, H - BOTTOM_PAD - h_sub), SUB,
              font=FONT_SUB, fill=WHITE, stroke_width=2, stroke_fill=BLACK_STROKE)

    # 출력 = 옛 폴더 그대로 = 사장 광고 매니저 = 이미지 swap만 (이름 동일)
    out_dir = INPUT_DIR / campaign_id
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"AD001-{campaign_id}-{base_id}.png"
    img.convert("RGB").save(out_path, "PNG", quality=95)
    return True


def main():
    success = 0
    fail = 0
    for campaign in CAMPAIGNS:
        for base_id, base_filename, line1_parts, line2_text in BASE_IMAGES:
            ok = generate_one(base_id, base_filename, line1_parts, line2_text, campaign)
            if ok:
                success += 1
            else:
                fail += 1
        print(f"✅ {campaign}: 5 PNG 재양산")

    print(f"\n✅ v11 양산 완료: {success} PNG / 실패: {fail}")


if __name__ == "__main__":
    main()
