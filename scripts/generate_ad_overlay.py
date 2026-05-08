"""
STEP_85 — 이미지 텍스트 overlay 자동 양산
5 base × 14 캠페인 = 70 PNG (1080×1350, 4:5 Meta 피드)

- 사장 5/8 결정: 변호사 base 사용 X (5 채무자 PAS 변형만)
- 텍스트 = 사장 v3 PAS 카피 verbatim
- 상단 25% = 헤드라인 2줄 분리 ({지역} 관할법원 — / {법원}에서 회생 인가)
- 하단 25% = CTA 박스 (내 탕감액 무료 분석 / 신청하기 →)
- 중앙 50% = base 이미지 (텍스트 X)
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import sys

# 경로
INPUT_DIR = Path.home() / "OTMarketing/Image/01_debt_relief/광고주_법률사무소보광"
OUTPUT_DIR = INPUT_DIR / "ad_v4_final"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 폰트 (macOS 기본 AppleSDGothicNeo ttc)
FONT_PATH = "/System/Library/Fonts/AppleSDGothicNeo.ttc"

# 색상
COLOR_NAVY = (31, 41, 55)        # #1F2937
COLOR_WHITE = (255, 255, 255)
COLOR_CORAL = (239, 68, 68)      # #EF4444
COLOR_BLUE = (37, 99, 235)       # #2563EB
COLOR_TOP_BG = (255, 255, 255, 235)        # 흰 반투명
COLOR_BOTTOM_BG = (31, 41, 55, 245)         # 다크 네이비 반투명

# 크기 (1080×1350)
W, H = 1080, 1350

# 14 관할법원
COURTS = [
    ("seoul", "서울", "서울회생법원"),
    ("gyeonggi", "경기", "수원지방법원"),
    ("incheon", "인천", "인천지방법원"),
    ("busan", "부산", "부산지방법원"),
    ("daegu-gyeongbuk", "대구·경북", "대구지방법원"),
    ("gwangju-jeonnam", "광주·전남", "광주지방법원"),
    ("daejeon-sejong-chungnam", "대전·세종·충남", "대전지방법원"),
    ("chungbuk", "충북", "청주지방법원"),
    ("gyeongnam", "경남", "창원지방법원"),
    ("gyeonggi-bukbu", "경기 북부", "의정부지방법원"),
    ("ulsan", "울산", "울산지방법원"),
    ("jeonbuk", "전북", "전주지방법원"),
    ("gangwon", "강원", "춘천지방법원"),
    ("jeju", "제주", "제주지방법원"),
]

# 5 base (변호사 base 사용 X — 사장 5/8 결정)
BASE_IMAGES = [
    ("p1", "ad_v4_debtor_p1_credit-loan_woman.png", "신용대출 여성"),
    ("p2", "ad_v4_debtor_p2_stock-coin_man.png", "주식·코인 남성"),
    ("p3", "ad_v4_debtor_p3_salary-seizure_man.png", "월급 압류 남성"),
    ("p4", "ad_v4_debtor_p4_collateral_woman.png", "담보대출 여성"),
    ("p5", "ad_v4_debtor_p5_self-employed_man.png", "자영업자 남성"),
]


def load_font(size: int, bold: bool = True):
    """AppleSDGothicNeo ttc 안 weight index 박기 (Bold = 6, Regular = 0)"""
    candidates = [6, 5, 4, 0] if bold else [0, 1, 2]
    for idx in candidates:
        try:
            return ImageFont.truetype(FONT_PATH, size, index=idx)
        except Exception:
            continue
    return ImageFont.load_default()


def text_size(draw: ImageDraw.ImageDraw, text: str, font):
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def draw_top_headline(img: Image.Image, region: str, court: str) -> Image.Image:
    """상단 영역 헤드라인 2줄 분리 박기 (흰 반투명 배경 + 다크 네이비 글자)"""
    # 상단 흰 반투명 박스 (높이 280px, 24px gap)
    box_h = 280
    overlay = Image.new("RGBA", (W, box_h), COLOR_TOP_BG)
    img.paste(overlay, (0, 0), overlay)

    draw = ImageDraw.Draw(img)
    font = load_font(64, bold=True)

    line1 = f"{region} 관할법원 —"
    line2 = f"{court}에서 회생 인가"

    w1, h1 = text_size(draw, line1, font)
    w2, h2 = text_size(draw, line2, font)

    # 두 줄 합 높이 + 간격 32px → 박스 안 가운데 정렬
    total_h = h1 + 32 + h2
    y_start = (box_h - total_h) // 2

    x1 = (W - w1) // 2
    x2 = (W - w2) // 2

    draw.text((x1, y_start), line1, fill=COLOR_NAVY, font=font)
    draw.text((x2, y_start + h1 + 32), line2, fill=COLOR_NAVY, font=font)

    return img


def draw_bottom_cta(img: Image.Image) -> Image.Image:
    """하단 영역 CTA 박스 박기 (다크 네이비 배경 + 흰 글자 + 파란 버튼)"""
    cta_y = H - 280   # 1070
    overlay = Image.new("RGBA", (W, H - cta_y), COLOR_BOTTOM_BG)
    img.paste(overlay, (0, cta_y), overlay)

    draw = ImageDraw.Draw(img)

    # 1줄 — "내 탕감액 무료 분석"
    line1 = "내 탕감액 무료 분석"
    font1 = load_font(40, bold=False)
    w1, h1 = text_size(draw, line1, font1)
    x1 = (W - w1) // 2
    y1 = cta_y + 50
    draw.text((x1, y1), line1, fill=COLOR_WHITE, font=font1)

    # 2줄 — 파란 버튼 박스 + "신청하기 →"
    btn_h = 100
    btn_padding_x = 80
    btn_y = cta_y + 130
    btn_rect = (btn_padding_x, btn_y, W - btn_padding_x, btn_y + btn_h)
    draw.rounded_rectangle(btn_rect, radius=50, fill=COLOR_BLUE)

    btn_text = "신청하기 →"
    font_btn = load_font(44, bold=True)
    w_btn, h_btn = text_size(draw, btn_text, font_btn)
    x_btn = (W - w_btn) // 2
    y_btn = btn_y + (btn_h - h_btn) // 2 - 6  # baseline 미세 조정
    draw.text((x_btn, y_btn), btn_text, fill=COLOR_WHITE, font=font_btn)

    return img


def fit_to_canvas(src: Image.Image, target_w: int, target_h: int) -> Image.Image:
    """비율 유지하며 1080×1350 캔버스에 cover crop"""
    sw, sh = src.size
    ratio_src = sw / sh
    ratio_dst = target_w / target_h

    if ratio_src > ratio_dst:
        # source 더 가로 김 → 높이 맞춤 + 좌우 crop
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


def generate_ad(base_id: str, base_filename: str, base_label: str,
                campaign_id: str, region: str, court: str) -> bool:
    base_path = INPUT_DIR / base_filename
    if not base_path.exists():
        print(f"⚠ {base_filename} 박힘 X — skip")
        return False

    src = Image.open(base_path).convert("RGBA")
    img = fit_to_canvas(src, W, H).convert("RGBA")

    img = draw_top_headline(img, region, court)
    img = draw_bottom_cta(img)

    output_filename = f"AD001-{campaign_id}-{base_id}.png"
    output_path = OUTPUT_DIR / output_filename
    img.convert("RGB").save(output_path, "PNG", quality=95, optimize=True)
    return True


def main() -> int:
    print(f"INPUT_DIR  = {INPUT_DIR}")
    print(f"OUTPUT_DIR = {OUTPUT_DIR}")
    print(f"매트릭스: {len(BASE_IMAGES)} base × {len(COURTS)} 캠페인 = {len(BASE_IMAGES) * len(COURTS)} PNG")
    print("─" * 60)

    success = 0
    fail = 0
    missing_bases = []

    for base_id, base_filename, base_label in BASE_IMAGES:
        if not (INPUT_DIR / base_filename).exists():
            missing_bases.append(base_filename)

    if missing_bases:
        print("❌ 박힘 X base:")
        for m in missing_bases:
            print(f"  - {m}")
        return 1

    for base_id, base_filename, base_label in BASE_IMAGES:
        for campaign_id, region, court in COURTS:
            ok = generate_ad(base_id, base_filename, base_label,
                             campaign_id, region, court)
            if ok:
                success += 1
            else:
                fail += 1

    print("─" * 60)
    print(f"✅ 양산 완료: {success} PNG / 실패: {fail}")
    print(f"출력: {OUTPUT_DIR}")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
