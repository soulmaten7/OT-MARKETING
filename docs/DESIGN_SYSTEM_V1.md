# OT MARKETING 디자인 시스템 v1

> 버전: 1.0.0 | 작성: 2026-05-14 | 작성자: Claude Code (STEP_95)

---

## 1. 디자인 철학

**토스 톤 = 미니멀·신뢰**

- **흰 배경 + 절제된 색**: 정보가 먼저, 색은 조력자
- **큰 여백**: 숨 쉬는 레이아웃 = 신뢰감
- **굵은 타이포**: 핵심 정보 즉각 인지
- **깔끔한 그리드**: 예측 가능한 구조 = 사용자 안정감
- **CPA 광고대행사 X → 3 기능 SaaS 플랫폼**: 모든 UX 결정의 기준

---

## 2. 컬러 팔레트

### Primary (토스 블루)

| 토큰 | Hex | Tailwind 클래스 | 용도 |
|---|---|---|---|
| primary-50 | `#EBF3FE` | `bg-primary-50` | 배경 강조 |
| primary-100 | `#D6E7FD` | `bg-primary-100` | 연한 배경 |
| primary-200 | `#AECEFB` | `bg-primary-200` | 테두리 |
| primary-300 | `#85B6F9` | `bg-primary-300` | — |
| primary-400 | `#5C9DF7` | `bg-primary-400` | — |
| **primary-500** | **`#3182F6`** | **`bg-primary-500`** | **메인 포인트 색** |
| primary-600 | `#2769C5` | `bg-primary-600` | hover 상태 |
| primary-700 | `#1D4F94` | `bg-primary-700` | active 상태 |
| primary-800 | `#143562` | `bg-primary-800` | — |
| primary-900 | `#0A1B31` | `bg-primary-900` | 다크 강조 |

### Neutral (뉴트럴)

| 토큰 | Hex | 용도 |
|---|---|---|
| neutral-0 | `#FFFFFF` | 흰 배경 |
| neutral-50 | `#F9FAFB` | 페이지 배경 |
| neutral-100 | `#F2F4F6` | 카드 배경·구분선 |
| neutral-200 | `#E5E8EB` | border |
| neutral-300 | `#D1D6DB` | disabled border |
| neutral-400 | `#B0B8C1` | placeholder |
| neutral-500 | `#8B95A1` | 보조 텍스트 |
| neutral-600 | `#6B7684` | 본문 보조 |
| neutral-700 | `#4E5968` | 본문 |
| neutral-800 | `#333D4B` | 제목 |
| neutral-900 | `#191F28` | 강조 제목 (토스 다크) |

### 시맨틱

| 토큰 | Hex | 용도 |
|---|---|---|
| ot-success | `#00C73C` | 성공·완료 |
| ot-warning | `#FF9500` | 경고 |
| ot-error | `#F04452` | 에러 |

---

## 3. 타이포그래피

**폰트**: Pretendard Variable (CDN 로딩) → fallback: system-ui

| 스케일 | 크기 | 굵기 | 용도 |
|---|---|---|---|
| display | 40px | 700 | Hero 제목 |
| h1 | 32px | 700 | 페이지 제목 |
| h2 | 24px | 700 | 섹션 제목 |
| h3 | 20px | 600 | 소제목 |
| body-lg | 17px | 400 | 본문 대형 |
| body | 15px | 400 | 일반 본문 |
| caption | 13px | 400 | 보조 설명 |

---

## 4. 스페이싱

4px 베이스 스케일:

| 토큰 | 값 |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |
| 4xl | 96px |

---

## 5. 라운드 (Border Radius)

토스 = 큰 라운드 (부드러움):

| 토큰 | 값 | Tailwind |
|---|---|---|
| sm | 8px | `rounded-lg` |
| md | 12px | `rounded-xl` |
| lg | 16px | `rounded-2xl` |
| xl | 20px | `rounded-3xl` |
| full | 9999px | `rounded-full` |

---

## 6. 섀도

토스 = 옅은 섀도 (과하지 않음):

| 토큰 | 값 |
|---|---|
| sm | `0 1px 2px rgba(0,0,0,0.04)` |
| md | `0 4px 12px rgba(0,0,0,0.06)` |
| lg | `0 8px 24px rgba(0,0,0,0.08)` |

---

## 7. 컴포넌트 사용법

### Button

```tsx
// primary (토스 블루)
<button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors">
  시작하기
</button>

// secondary
<button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold px-5 py-2.5 rounded-xl transition-colors">
  더 보기
</button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"

<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
  </CardHeader>
  <CardContent>본문</CardContent>
</Card>

// clickable 카드
<Card clickable>...</Card>
```

### Input

```tsx
<input
  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors text-sm"
  placeholder="입력해주세요"
/>
```

### Badge

```tsx
import { Badge } from "@/components/ui/Badge"

<Badge variant="primary">신규</Badge>
<Badge variant="success">완료</Badge>
<Badge variant="warning">검토 중</Badge>
<Badge variant="error">오류</Badge>
<Badge variant="neutral">기본</Badge>
```

### Modal

```tsx
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/components/ui/Modal"

const [open, setOpen] = useState(false)

<Modal open={open} onClose={() => setOpen(false)}>
  <ModalHeader>
    <ModalTitle>제목</ModalTitle>
  </ModalHeader>
  <ModalBody>내용</ModalBody>
  <ModalFooter>
    <button onClick={() => setOpen(false)}>확인</button>
  </ModalFooter>
</Modal>
```

### Section

```tsx
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/Section"

<Section variant="muted" size="lg">
  <SectionHeader>
    <SectionTitle>섹션 제목</SectionTitle>
    <SectionDescription>설명 텍스트</SectionDescription>
  </SectionHeader>
  {/* 내용 */}
</Section>
```

---

## 8. 카피 톤 가이드

**토스 voice = 사용자 가치 중심, 군더더기 X**

| ❌ 피할 것 | ✅ 토스 톤 |
|---|---|
| "최고의 서비스를 제공합니다" | "1분 안에 확인할 수 있어요" |
| "빠르고 정확한 시스템" | "입력하면 바로 연결됩니다" |
| "고객만족 1위" | "실제 사용한 분들의 평균 결과" |
| "지금 바로 시작하세요!" | "시작하기" |

---

## 9. 금지 사항

- **하드코딩 색 X**: `#3182F6` 직접 사용 X → `bg-primary-500` 사용
- **옛 ad-hoc 패턴 X**: `bg-blue-600`, `text-blue-700` 등 Tailwind 기본 blue 직접 사용 X (디자인 시스템 토큰으로 마이그레이션)
- **인라인 style= X**: Tailwind 클래스 우선
- **Navy·Coral 혼용 X** (신 페이지): 옛 Navy+Coral = 기존 페이지 유지. 신 페이지 = Neutral+Primary-500만

---

## 10. 파일 위치

```
ot-marketing-source/
├── lib/design-system/tokens.ts       # TypeScript 토큰 참조
├── app/globals.css                   # @theme inline 토큰 (Tailwind v4)
├── components/ui/
│   ├── button.tsx                    # (기존) shadcn 버튼
│   ├── input.tsx                     # (기존) shadcn 인풋
│   ├── Card.tsx                      # ⭐ 신규
│   ├── Badge.tsx                     # ⭐ 신규
│   ├── Modal.tsx                     # ⭐ 신규
│   └── Section.tsx                   # ⭐ 신규
└── app/design-system/page.tsx        # 데모 페이지 (/design-system)
```

---

## 데모 페이지

`https://ot-marketing.kr/design-system`

사장 + 팀원이 디자인 시스템 한눈에 확인 가능. robots noindex 적용.
