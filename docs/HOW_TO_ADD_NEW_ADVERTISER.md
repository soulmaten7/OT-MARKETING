# 새 광고주 LP 추가 가이드 (5분 절차)

> **사용 시점**: 사장이 새 광고주와 계약 → "정수기 광고주 추가" 같은 명령 → Claude Code 자율 실행
>
> **본질**: otpage1.com/ default 베이스 (DefaultLandingTemplate) = 검증된 LP. 이 베이스 복사 + placeholder swap = 5분.
>
> **검증된 LP 패턴 (STEP_92~94)**:
> - 4→2 Step 압축 (Page 1 = 옵션 3 한 화면, Page 2 = 연락처)
> - 체크박스 3열 2행 컴팩트
> - 진행률 바 헤더 1자 박힘
> - Page 2 카피 단순화
> - 라이브 토스트 비활성 (필요 시 재활성)
> - Microsoft Clarity 데이터 수집 (layout 박힘)
> - Meta 도메인 인증 메타 태그 (layout 박힘)

---

## 사전 준비 (사장 손, 광고주 결정 후)

1. **광고주 시트** 생성 (예: `OT_정수기렌탈_DB_2026`) + 16 컬럼 표준 구조 (A~P)
   - 헤더: 번호·날짜·이름·연락처·옵션1·옵션2·문의사항·IP·플랫폼·수임료·수당·메모1~5
2. **광고주 알림용 텔레그램 봇** 생성 (예: `Coway_bot`)
   - BotFather → /newbot → 토큰 박힘 → chat ID 박힘
3. **INDUSTRY_REGISTRY.ts** 에서 해당 라우트 (/select2·/select3 등) 의 advertiser 정보 확정

---

## Claude Code 자율 실행 절차 (Cowork → Claude Code 명령)

### Step 1: default 베이스 복사

```bash
cp ot-marketing-source/components/landing/DefaultLandingTemplate.tsx \
   ot-marketing-source/components/landing/Select2LandingTemplate.tsx
```

함수명도 swap:
- `export function DefaultLandingTemplate()` → `export function Select2LandingTemplate()`

### Step 2: placeholder 영역 swap (정수기 예시)

| 영역 | placeholder | 예시 swap (정수기) |
|---|---|---|
| 브랜드 로고 | `[🎯]` | `💧` |
| 브랜드명 | `[브랜드명을 여기에 박을 거]` | `정수기렌탈센터` |
| primary color | `gray-400` / `gray-600` | `blue-500` / `blue-700` |
| Step 1 질문 | `01. [첫 번째 질문을 여기에 박을 거]` | `01. 현재 어떤 정수기 사용 중이세요?` |
| Step 1 옵션 | `[옵션1]~[옵션6]` | `코웨이`, `청호`, `LG`, `SK`, `없음`, `기타` |
| Step 2 질문 | `02. [두 번째 질문을 여기에 박을 거]` | `02. 가구원 수는?` |
| Step 2 옵션 | `[옵션1]~[옵션6]` | `1인`, `2인`, `3인`, `4인`, `5인+`, `기타` |
| Step 3 질문 | `03. [자세한 상황을 여기에 박을 거]` | `03. 원하시는 조건을 자세히 남겨주세요` |
| Step 3 placeholder | `예: [사용자 상황 예시를 여기에 박을 거]` | `예: 6년 약정 끝나서 옮기고 싶어요...` |
| Step 1 보조 안내 | `* [필수 안내 사항 박을 차례]` | `* 만 19세 이상부터 가입 가능합니다.` |
| Page 2 카피 | `02. 무료 [가치] [상담 형식]...` | `02. 무료 견적 비교를 위해...` |
| CTA 버튼 | `내 [가치] 무료 [분석/견적/진단] 시작` | `내 최저가 견적 무료 받기` |
| 필수 동의 | `[필수] 개인정보 수집·이용 동의 ([상담 안내 목적 — 업종별 swap])` | `[필수] 개인정보 수집·이용 동의 (정수기 견적 안내 목적)` |
| Footer 회사 정보 | `[회사명] | 대표 [대표자명] | 사업자등록번호 [000-00-00000]` | `(주)○○렌탈 | 대표 ○○○ | 123-45-67890` |
| Footer 주소 | `본점: [본점 주소 박을 차례]` | `본점: 서울 ○○구 ...` |
| Footer 광고 책임 | `광고책임 [업종별] 별도 표기 · [업종별 법규 §00의0 ⓘ] 의무 표시` | `광고책임 대표자 별도 표기 · 표시광고법 §3 ① 의무 표시` |
| Footer 면책 | `본 광고는 [업종별 상담/안내] 안내이며...` | `본 광고는 정수기 견적 안내이며, 결과는 사안에 따라 다를 수 있습니다.` |
| API 엔드포인트 | `'/api/[advertiser-id]-submit'` | `'/api/coway-submit'` |
| 환경변수 | `[ADVERTISER_ID]_SHEET_ID` | `COWAY_SHEET_ID` |
| Meta Pixel | `content_name: '[업종-키워드]'` | `content_name: 'water_purifier_rental'` |

### Step 3: 라우트 신규

파일: `ot-marketing-source/app/select2/page.tsx`

```typescript
import { Select2LandingTemplate } from "@/components/landing/Select2LandingTemplate";

export const metadata = {
    title: "정수기 무료 견적 비교 — 정수기렌탈센터",
    description: "코웨이·청호·LG·SK 정수기 견적 1분 무료 비교.",
};

export default function Select2Page() {
    return <Select2LandingTemplate />;
}
```

또는 `app/[slug]/page.tsx` 가 dynamic 라우트 박혀 있어 = 그 안에 분기 추가 (보광 패턴 동일).

### Step 4: API route 신규

`app/api/coway-submit/route.ts` (보광 API 패턴 그대로 복사 + 시트 ID swap)

- BOGLAW_SHEET_ID → COWAY_SHEET_ID
- TELEGRAM_BOT_TOKEN_BOGWANG → TELEGRAM_BOT_TOKEN_COWAY
- TELEGRAM_CHAT_ID_BOGWANG → TELEGRAM_CHAT_ID_COWAY
- 광고주명 swap (텔레그램 메시지 안)
- (공통 시트 박기 = 그대로 / Q열 자동 박힘 = "코웨이" 또는 광고주 이름)

### Step 5: Vercel env 추가

```bash
cd ot-marketing-source
echo "광고주 시트 ID" | vercel env add COWAY_SHEET_ID production
echo "텔레그램 봇 토큰" | vercel env add TELEGRAM_BOT_TOKEN_COWAY production
echo "텔레그램 chat id" | vercel env add TELEGRAM_CHAT_ID_COWAY production
vercel --prod --yes
```

### Step 6: INDUSTRY_REGISTRY.ts 업데이트

```typescript
"/select2": {
    industry: "정수기·렌탈·구독",
    status: "✅ ACTIVE",  // ← ⏳ PLACEHOLDER 에서 swap
    advertiser: "정수기렌탈센터",
    advertiserId: "AD002",
    sheetId: "광고주 시트 ID",
    telegramBot: "Coway_bot",
    pixelId: "광고주 Pixel ID 또는 OT 공통 Pixel ID",
    notes: "정수기 렌탈 영업용. 6년 약정 끝나는 고객 타겟.",
    legalNote: "소비자기본법 §3 + 표시광고법 §3 준수",
},
```

### Step 7: Apps Script 분배 ADVERTISER_SHEETS 업데이트 + 공통 시트 Q열 드롭다운 옵션 추가

공통 시트 (1THuTtpdZi...) Apps Script:
```javascript
const ADVERTISER_SHEETS = {
    "보광": "1xX7qJX56Nj0zrFfAAA-i69oEyaQlvhnIxXRgDQm1Mjc",
    "정수기렌탈센터": "COWAY_SHEET_ID 값",  // ← 신규 1줄
};
```

공통 시트 Q열 드롭다운 (Q2:Q1000):
- 옛: `보광` / `분배안함` / 빈칸
- 새: `보광` / `정수기렌탈센터` / `분배안함` / 빈칸

### Step 8: Playwright 검증 + Vercel deploy

```bash
cd ot-marketing-source
npm run build
git add .
git commit -m "feat(lp): AD002 정수기렌탈센터 LP + API 박기 (5분 셋업)"
git push
vercel --prod --yes
```

라이브 검증:
- https://otpage1.com/select2 = 정수기렌탈센터 LP 박힘
- API /api/coway-submit = 시트 입력 + 텔레그램 알림 정상

---

## 본질 = 5분 절차

위 8 Step = Claude Code 자율 = 5~10분. 사장 = "정수기 광고주 추가" 한 줄 + 광고주 시트 ID·텔레그램 봇 정보 박으면 끝.

검증된 LP 패턴 = 1 광고주든 100 광고주든 동일 구조 = Phase 4 1조 비전 매칭.

---

## 변경 이력

- **2026-05-12 STEP_94**: 신규 작성. DefaultLandingTemplate placeholder 베이스 박힘 + INDUSTRY_REGISTRY 매핑 + 8 Step 5분 절차.
