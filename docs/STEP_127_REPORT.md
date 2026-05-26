# STEP_127 REPORT — ot-marketing.kr = CPA 광고 의뢰 1 페이지 사이트 정리

> 작성일: 2026-05-26 | 모델: Sonnet | 자율 실행 완료

---

## 1. Phase 0 백업

- **백업 위치 (방법 A)**: `~/OTMarketing/_BACKUP/ot-marketing-source_FULL_20260526_161511/` ✓
- **git 브랜치 (방법 B)**: ❌ Xcode 라이선스 미동의로 git 명령 불가 → **사장 손 작업 필요** (아래 안내 참조)
- **OT MARKETING 로고 파일**: `/public/logo-ot-marketing.png` (+ dark, transparent, white 버전 있음)
- **사업자 정보**: 대표 장은태 / 사업자등록번호 141-39-01329 (footer에 적용 완료)

---

## 2. 폐기 결과

### 라우트 17개 삭제 ✓
- `(marketing)/`: admin · ads · blog-sms · dashboard · landing-pages · legal · login · logout · pricing · samples · signup · subscribe · thank-you (13개)
- `app/`: [slug] · auth · design-system · home (4개)

### API 라우트 폐기 ✓
- `app/api/payments/` (Toss + Supabase 의존)
- `app/api/landing-pages/` (Supabase 의존)
- `app/api/landing-submit/` (폐기)

### 유지 API 라우트 ✓
- `app/api/contact/` — CPA 문의 폼 → Google Sheets 자동 입력
- `app/api/boglaw-submit/` — 보광 LP (otpage1.com) 전용
- `app/api/boglaw-live-toast/` — 보광 라이브 토스트

### 컴포넌트 폐기 ✓
- `components/lp` · `components/landing` · `components/payment` · `components/blog-sms` · `components/_archive` · `components/sections/ads/` · `components/MetaPixel.tsx` · `components/GoogleAdsTag.tsx` · `components/Clarity.tsx`

### lib 폐기 ✓
- `lib/ai` · `lib/lp` · `lib/blog-sms` · `lib/supabase` · `lib/landing` · `lib/design-system` · `lib/adsImageMap.ts` · `lib/industry-mockup-copy.ts` · `lib/fbq.ts` · `lib/gtag.ts` · `lib/advertisers` · `lib/industries`

### 최종 남은 구조
```
components/
├── animations/    (fade-in, stagger)
├── cpa/           (CpaInquiryForm, hero, how-it-works, industries, metrics, what-we-bring, contact-form, cpa-model)
├── layout/        (navbar, footer)
└── ui/            (Card, Badge, Section, motion, etc.)

lib/
└── utils.ts

app/(marketing)/
├── cpa/           (메인 페이지)
├── privacy/       (개인정보처리방침)
└── terms/         (이용약관)

app/api/
├── contact/       (CPA 문의 → Google Sheets)
├── boglaw-submit/ (보광 LP 제출)
└── boglaw-live-toast/ (보광 라이브 토스트)
```

---

## 3. 정리 결과

| 항목 | 결과 |
|---|---|
| `/` → `/cpa` redirect | ✓ HTTP 307 |
| navbar = OT MARKETING 로고만 | ✓ 메뉴 0건 |
| footer = OT MARKETING 명의 + 사업자 정보 + 카톡 + 이메일 + 약관 링크 | ✓ |
| `/cpa` 카피 = 의뢰 받기 톤 조정 (광고 의뢰하기 버튼) | ✓ |
| `/ads` 링크 제거 (폐기된 라우트) | ✓ |
| "OT MARKETING" 통일 (One Trillion 흔적 0건) | ✓ |
| 양식 = Google Sheets + 텔레그램 (옛 인프라) | ✓ |

---

## 4. 인프라 정리

| 항목 | 결과 |
|---|---|
| Supabase import 잔여 0건 | ✓ |
| Toss import 잔여 0건 | ✓ |
| Meta Pixel import 잔여 0건 | ✓ |
| Google Ads/gtag import 잔여 0건 | ✓ |
| Clarity import 잔여 0건 | ✓ |
| `.env.local` 폐기 변수 (Supabase·Toss·Pixel·Clarity·Auth·SiteMode) 제거 | ✓ |
| `.env.local` 유지 변수 (Google Sheets·텔레그램·보광시트) 보존 | ✓ |
| `package.json` prebuild 스크립트 제거 (삭제된 /ads 컴포넌트 검증 스크립트) | ✓ |
| `middleware.ts` 단순화 (Supabase Auth·SiteMode 분기 제거) | ✓ |
| `app/layout.tsx` = 메타 OT MARKETING 통일 + Pixel·GA·Clarity 제거 | ✓ |

---

## 5. 검증 결과

### npm run build
```
✓ Compiled successfully in 8.3s
```
빌드 성공 ✓

### HTTP 상태코드
| 라우트 | 상태 |
|---|---|
| `/cpa` | 200 ✓ |
| `/privacy` | 200 ✓ |
| `/terms` | 200 ✓ |
| `/` | 307 (→ /cpa redirect) ✓ |
| `/landing-pages` | 404 ✓ |
| `/pricing` | 404 ✓ |
| `/subscribe` | 404 ✓ |
| `/dashboard` | 404 ✓ |
| `/blog-sms` | 404 ✓ |
| `/ads` | 404 ✓ |
| `/samples` | 404 ✓ |
| `/legal` | 404 ✓ |
| `/login` | 404 ✓ |
| `/signup` | 404 ✓ |
| `/admin` | 404 ✓ |

---

## 6. 게이트 통과 (12/12)

| Gate | 내용 | 결과 |
|---|---|---|
| Gate 1 | 백업 방법A 존재 (rsync) | ✓ |
| Gate 2 | 폐기 라우트 17개 = 0 | ✓ |
| Gate 3 | `/` → `/cpa` redirect 코드 존재 | ✓ |
| Gate 4 | navbar = OT MARKETING 로고 + 메뉴 0건 + One Trillion 0건 | ✓ |
| Gate 5 | footer = OT MARKETING × 2 + 사업자정보 + 연락처 + 약관링크 | ✓ |
| Gate 6 | 폐기 컴포넌트 디렉토리 0 | ✓ |
| Gate 7 | 폐기 lib 디렉토리 0 | ✓ |
| Gate 8 | 사용 X import (Supabase·Toss·Pixel·Clarity) 잔여 0 | ✓ |
| Gate 9 | env 폐기 변수 0 / 유지 변수 ≥2 | ✓ |
| Gate 10 | app/layout.tsx = OT MARKETING ≥2 / One Trillion 0 | ✓ |
| Gate 11 | npm run build = Compiled successfully | ✓ |
| Gate 12 | dev 서버 HTTP 200/307/404 전체 통과 | ✓ |

---

## 7. 사장 손 작업 안내

### 즉시 필요
- [ ] **localhost:3000/cpa 직접 확인** — 디자인·내용·폼 동작 검수
- [ ] **git archive 브랜치 생성** — Xcode 라이선스 동의 후 실행:
  ```bash
  # 터미널에서 사장이 직접:
  sudo xcodebuild -license   # 라이선스 동의
  cd ~/OTMarketing/ot-marketing-source
  git checkout -b archive/before-cpa-only
  git add -A
  git commit -m "archive: snapshot before CPA-only cleanup (2026-05-26)"
  git checkout main
  ```
- [ ] **git push origin main** — production deploy (ot-marketing.kr 라이브 반영)

### 검증 후 작업
- [ ] **Vercel env 정리** — Vercel 대시보드에서 아래 변수 삭제:
  - NEXT_PUBLIC_SUPABASE_URL · NEXT_PUBLIC_SUPABASE_ANON_KEY · SUPABASE_SERVICE_ROLE_KEY · SUPABASE_DB_PASSWORD
  - NEXT_PUBLIC_TOSS_CLIENT_KEY · TOSS_SECRET_KEY
  - NEXT_PUBLIC_META_PIXEL_ID · NEXT_PUBLIC_FB_DOMAIN_VERIFICATION · NEXT_PUBLIC_CLARITY_PROJECT_ID
  - NEXT_PUBLIC_DEV_BYPASS_AUTH · NEXT_PUBLIC_SITE_MODE
  - ADMIN_USER · ADMIN_PASS

### 별도 진행
- [ ] 보광에게 광고 멈춤 통보 + 정산 정리
- [ ] (선택) `onetrillion.app` 도메인 보류 확인

---

## 변경 이력

- **2026-05-26 Session #12**: STEP_127 자율 실행 완료. ot-marketing.kr = /cpa 광고 의뢰 받는 1 페이지 사이트. 17개 라우트 폐기 + Supabase·Toss·Pixel·Clarity 코드·env 정리 + OT MARKETING 로고·명의 통일 + build 성공 + Gate 12/12 통과.
