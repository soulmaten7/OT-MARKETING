# STEP_95 실행 보고서 — OT MARKETING 디자인 시스템 v1

> 실행일: 2026-05-14 | 모델: Claude Sonnet | 커밋: `6bd0b63`

---

## 결과 요약

| Phase | 내용 | 결과 |
|---|---|---|
| Phase 0 | 설계 검토 | ✅ |
| Phase 1 | tokens.ts 생성 | ✅ |
| Phase 2 | globals.css @theme inline 토큰 추가 | ✅ |
| Phase 3 | 공통 컴포넌트 4종 생성 | ✅ |
| Phase 4 | /design-system 데모 페이지 + 문서 | ✅ |
| Phase 5 | Playwright 5 게이트 전체 통과 | ✅ |
| Phase 6 | build → git commit → push → Vercel deploy | ✅ |

---

## Phase 1 — 디자인 토큰 (tokens.ts)

**파일**: `lib/design-system/tokens.ts`

- Primary (토스 블루) 10단계: #EBF3FE → #0A1B31
- Neutral 11단계: #FFFFFF → #191F28
- 시맨틱: success #00C73C / warning #FF9500 / error #F04452
- 타이포: display(40) / h1(32) / h2(24) / h3(20) / body-lg(17) / body(15) / caption(13)
- 스페이싱: xs(4) → 4xl(96) 4px 베이스 8단계
- 라운드: sm(8) → full(9999) 5단계
- 섀도: sm/md/lg 3단계

---

## Phase 2 — Tailwind v4 토큰 (globals.css)

**위치**: `app/globals.css` `@theme inline` 블록

```css
--color-primary-50: #EBF3FE;
...
--color-primary-500: #3182F6;   /* 토스 블루 메인 */
...
--color-neutral-0:  #FFFFFF;
...
--color-neutral-900: #191F28;
--color-ot-success: #00C73C;
--color-ot-warning: #FF9500;
--color-ot-error:   #F04452;
```

기존 Navy(`--color-primary`) / Coral 시스템과 충돌 없음.
- 기존: `bg-primary` (shade 없음 = Navy)
- 신규: `bg-primary-500` (shade 있음 = 토스 블루)

---

## Phase 3 — 공통 컴포넌트 (components/ui/)

| 파일 | 주요 Props |
|---|---|
| `Card.tsx` | `variant?: "default"\|"muted"\|"primary"`, `clickable?` |
| `Badge.tsx` | `variant?: "primary"\|"success"\|"warning"\|"error"\|"neutral"` |
| `Modal.tsx` | `open`, `onClose`, `size?: "sm"\|"md"\|"lg"`, Escape key |
| `Section.tsx` | `variant?: "white"\|"muted"\|"primary"`, `size?`, `contained?` |

기존 `button.tsx` + `input.tsx` + 신규 4종 = **6 컴포넌트 완성**.

---

## Phase 4 — 데모 페이지 + 문서

- **데모**: `https://ot-marketing.kr/design-system` (noindex = layout.tsx)
- **전체 문서**: `ot-marketing-source/docs/DESIGN_SYSTEM_V1.md`
- **미러 요약**: `docs/DESIGN_SYSTEM_V1.md`

---

## Phase 5 — 거짓 보고 방지 게이트

**스크립트**: `scripts/verify_step95_dom.mjs`

| 게이트 | 내용 | 결과 |
|---|---|---|
| 1 | /design-system 렌더링 (컬러 섹션 노출) | ✅ |
| 2 | primary 버튼 bg-primary-500 class 확인 | ✅ |
| 3 | Pretendard `<link>` 태그 존재 | ✅ |
| 4 | 6 컴포넌트 섹션 헤더 모두 렌더링 | ✅ |
| 5a | 홈(/) 기존 페이지 무영향 | ✅ |
| 5b | /select11 기존 페이지 무영향 | ✅ |

**회귀**: 기존 페이지 2종 이상 없음 ✅

---

## Phase 6 — 빌드 + 배포

```
빌드: ✅ next build 성공 (1017 lines added, 10 files)
커밋: 6bd0b63
푸시: origin/main ✅
Vercel: 자동 배포 진행 (push → production)
```

---

## 트러블슈팅 기록

| 이슈 | 원인 | 해결 |
|---|---|---|
| `"use client"` + `export const metadata` 충돌 | Next.js 금지 조합 | metadata → `app/design-system/layout.tsx` 분리 |
| Card variant `"white"` TS 에러 | Card props 타입은 `"default"` | `"white"` → `"default"` 수정 |
| Playwright `networkidle` timeout (32s) | 초기 컴파일 지연 | `domcontentloaded` + curl pre-warm |
| font 검증 `Times` 반환 | headless CDN 미로딩 | `getComputedStyle` → `<link>` 태그 존재 검증으로 변경 |

---

## 데모 URL

`https://ot-marketing.kr/design-system`

사장 + 팀원이 디자인 시스템 전체를 한눈에 확인 가능. robots noindex 적용.
