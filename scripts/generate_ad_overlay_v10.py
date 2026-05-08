"""
STEP_85.7 — 광고 이미지 텍스트 overlay 자동 양산 (v10 spec)
- 5 base × 14 캠페인 = 70 PNG (1080×1350, 4:5 Meta 피드)
- 디자인: Less is More + 1 강조 + 그라디언트 + 미세 stroke
- 박스 X / 단순 텍스트 (Meta 알고리즘 ↑ + 영화 포스터 톤)
- 색상: 흰 메인 + "압류" 만 코랄 (1 강조) + 미세 검정 stroke
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import sys

# 경로
HOME = Path.home()
INPUT_DIR = HOME / "OTMarketing/Image/01_debt_relief/광고주_법률사무소보광"
OUTPUT_DIR = INPUT_DIR / "ad_v4_final"
FONT_DIR = HOME / "OTMarketing/ot-marketing-source/scripts/fonts"

# 폰트
FONT_HEAD = ImageFont.truetype(str(FONT_DIR / "Pretendard-ExtraBold.otf"), 92)
FONT_SUB = ImageFont.truetype(str(FONT_DIR / "Pretendard-Bold.otf"), 56)

# 색상
WHITE = (255, 255, 255, 255)
CORAL = (252, 165, 165, 255)
BLACK_STROKE = (0, 0, 0, 230)

# 캔버스
W, H = 1080, 1350

# 5 base + 헤드라인 매칭
BASE_IMAGES = [
    ("p1", "ad_v4_debtor_p1_credit-loan_woman.png",
     [("신용·가계대출", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
    ("p2", "ad_v4_debtor_p2_stock-coin_man.png",
     [("주식·코인 손실", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
    ("p3", "ad_v4_debtor_p3_salary-seizure_man.png",
     [("월급", WHITE), ("압류", CORAL), ("받고 계신가요", WHITE)], "빠른 해제 가능"),
    ("p4", "ad_v4_debtor_p4_collateral_woman.png",
     [("집·전세 담보", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
    ("p5", "ad_v4_debtor_p5_self-employed_man.png",
     [("사업 실패 부채", WHITE), ("압류", CORAL)], "빠른 해제 가능"),
]

# 14 캠페인
CAMPAIGNS = [
    "seoul", "gyeonggi", "incheon", "busan",
    "daegu-gyeongbuk", "gwangju-jeonnam", "daejeon-sejong-chungnam",
    "chungbuk", "gyeongnam", "gyeonggi-bukbu",
    "ulsan", "jeonbuk", "gangwon", "jeju",
]


def fit_to_canvas(src: Image.Image, target_w: int, target_h: int) -> Image.Image:
    """비율 유지 cover crop"""
    sw, sh = src.size
    ratio_src = sw / sh
    ratio_dst = target_w / target_h
    if ratio_src > ratio_dst:
        new_h = target_h
        new_w = int(new_h * ratio_src)
        resized = src.resize((new_w, new_h), Image.LANCZOS)
        crop_x = (new_w - target_w) // 2
        return resized.crop((crop_x, 0, crop_x + target_w, target_h))
    else:
        new_w = target_w
        new_h = int(new_w / ratio_src)
        resized = src.resize((new_w, new_h), Image.LANCZOS)
        crop_y = (new_h - target_h) // 2
        return resized.crop((0, crop_y, target_w, crop_y + target_h))


def apply_gradient(img: Image.Image) -> Image.Image:
    """상단 30% (alpha 180→0) + 하단 25% (alpha 0→180) 자연 어두움"""
    gradient = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(gradient)

    top_zone = int(H * 0.30)
    for y in range(top_zone):
        alpha = int(180 * (1 - y / top_zone))
        g_draw.rectangle([(0, y), (W, y + 1)], fill=(0, 0, 0, alpha))

    bot_zone_start = int(H * 0.75)
    for y in range(bot_zone_start, H):
        progress = (y - bot_zone_start) / (H - bot_zone_start)
        alpha = int(180 * progress)
        g_draw.rectangle([(0, y), (W, y + 1)], fill=(0, 0, 0, alpha))

    return Image.alpha_composite(img, gradient)


def text_size(draw: ImageDraw.ImageDraw, text: str, font, stroke_width: int = 0):
    bbox = draw.textbbox((0, 0), text, font=font, stroke_width=stroke_width)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def draw_multi_color(draw: ImageDraw.ImageDraw, parts, xy, font, stroke_width=2):
    """색상 분리 텍스트 박기 (parts = [(text, color), ...])"""
    x, y = xy
    space_w, _ = text_size(draw, " ", font)
    for i, (text, color) in enumerate(parts):
        draw.text((x, y), text, font=font, fill=color,
                  stroke_width=stroke_width, stroke_fill=BLACK_STROKE)
        tw, _ = text_size(draw, text, font, stroke_width=stroke_width)
        x += tw
        if i < len(parts) - 1:
            x += space_w


def generate_one(base_id: str, base_filename: str, line1_parts, line2_text: str, campaign_id: str) -> bool:
    base_path = INPUT_DIR / base_filename
    if not base_path.exists():
        print(f"⚠ {base_filename} 박힘 X — skip")
        return False

    src = Image.open(base_path).convert("RGBA")
    src = fit_to_canvas(src, W, H)

    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    img.paste(src, (0, 0))

    img = apply_gradient(img)
    draw = ImageDraw.Draw(img)

    LEFT_PAD = 60
    TOP_PAD = 70
    BOTTOM_PAD = 80

    # 줄 1 (multi-color, 강조 단어 포함)
    draw_multi_color(draw, line1_parts, (LEFT_PAD, TOP_PAD), FONT_HEAD, stroke_width=2)

    # 줄1 높이 (전체 텍스트 박힘)
    line1_full = " ".join(t for t, _ in line1_parts)
    _, h1 = text_size(draw, line1_full, FONT_HEAD, stroke_width=2)

    # 줄 2 (단색 흰)
    draw.text(
        (LEFT_PAD, TOP_PAD + h1 + 16),
        line2_text,
        font=FONT_HEAD,
        fill=WHITE,
        stroke_width=2,
        stroke_fill=BLACK_STROKE,
    )

    # 하단 부속 ("내 탕감액 무료 분석")
    SUB = "내 탕감액 무료 분석"
    _, h_sub = text_size(draw, SUB, FONT_SUB, stroke_width=2)
    draw.text(
        (LEFT_PAD, H - BOTTOM_PAD - h_sub),
        SUB,
        font=FONT_SUB,
        fill=WHITE,
        stroke_width=2,
        stroke_fill=BLACK_STROKE,
    )

    out_dir = OUTPUT_DIR / campaign_id
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"AD001-{campaign_id}-{base_id}.png"
    img.convert("RGB").save(out_path, "PNG", quality=95, optimize=True)
    return True


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    missing = [bf for _, bf, _, _ in BASE_IMAGES if not (INPUT_DIR / bf).exists()]
    if missing:
        print("❌ 박힘 X base PNG:")
        for m in missing:
            print(f"  - {m}")
        return 1

    success = 0
    fail = 0
    for campaign in CAMPAIGNS:
        for base_id, base_filename, line1_parts, line2_text in BASE_IMAGES:
            ok = generate_one(base_id, base_filename, line1_parts, line2_text, campaign)
            if ok:
                success += 1
            else:
                fail += 1
        print(f"✅ {campaign}: 5 PNG")

    print(f"\n{'─'*60}")
    print(f"✅ 양산 완료: {success} PNG / 실패: {fail}")
    print(f"출력: {OUTPUT_DIR}")
    print(f"{'─'*60}")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
