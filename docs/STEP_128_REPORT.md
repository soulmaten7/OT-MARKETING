# STEP_128 REPORT — Vercel env 정리 + Supabase pause

> 작성일: 2026-05-27 | 모델: Sonnet | 자율 실행 완료

---

## 1. Phase 0 도구 확인

- Vercel CLI 버전: 50.5.0 ✓
- Vercel 계정: soulmaten7-7785 ✓
- Supabase MCP 사용 가능: ✓

---

## 2. Phase 1 — Vercel env 제거

STEP_127 실행 시 이미 13개 변수 전부 제거 완료 상태. 본 STEP 에서 잔존 여부 재확인.

| 변수 | 상태 |
|---|---|
| NEXT_PUBLIC_SUPABASE_URL | ✓ 없음 |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | ✓ 없음 |
| SUPABASE_SERVICE_ROLE_KEY | ✓ 없음 |
| SUPABASE_DB_PASSWORD | ✓ 없음 |
| NEXT_PUBLIC_TOSS_CLIENT_KEY | ✓ 없음 |
| TOSS_SECRET_KEY | ✓ 없음 |
| NEXT_PUBLIC_META_PIXEL_ID | ✓ 없음 |
| NEXT_PUBLIC_FB_DOMAIN_VERIFICATION | ✓ 없음 |
| NEXT_PUBLIC_CLARITY_PROJECT_ID | ✓ 없음 |
| NEXT_PUBLIC_DEV_BYPASS_AUTH | ✓ 없음 |
| NEXT_PUBLIC_SITE_MODE | ✓ 없음 |
| ADMIN_USER | ✓ 없음 |
| ADMIN_PASS | ✓ 없음 |

- **잔존: 0 / 13** ✓

### 유지 변수 (10개)
NEXT_PUBLIC_SITE_URL · GOOGLE_PRIVATE_KEY · GOOGLE_SERVICE_ACCOUNT_EMAIL · GOOGLE_SHEET_ID · COMMON_SHEET_ID · BOGLAW_SHEET_ID · TELEGRAM_BOT_TOKEN_BOGWANG · TELEGRAM_CHAT_ID_BOGWANG · TELEGRAM_BOT_TOKEN_DEBT_RELIEF · TELEGRAM_CHAT_ID_DEBT_RELIEF

---

## 3. Phase 2 — Supabase 일시정지

- 프로젝트 ID: `khlefiktflynjcfsxnoa` (OTMarketing-blog-sms)
- 조회 결과: **`INACTIVE`** — 이미 정지 상태
- pause_project 호출 시 "Cannot pause due to current status: INACTIVE" → 추가 작업 불필요
- **결론: Supabase = 이미 정지 완료** ✓

---

## 4. Phase 3 — redeploy + 라이브 검증

- `vercel --prod` 재배포 완료 ✓
- `ot-marketing.kr/` → 308 → `www.ot-marketing.kr/` → 307 → `/cpa` → **200** ✓
- 페이지 소스 옛 env 흔적 (supabase.co · fbq · clarity.ms): **0건** ✓

---

## 5. 게이트 6/6 통과

| Gate | 내용 | 결과 |
|---|---|---|
| Gate 1 | Vercel CLI 작동 | ✓ PASS |
| Gate 2 | 13개 폐기 변수 잔존 0 | ✓ PASS |
| Gate 3 | 유지 변수 3/3 존재 | ✓ PASS |
| Gate 4 | Supabase = INACTIVE (정지) | ✓ PASS |
| Gate 5 | www.ot-marketing.kr/cpa = HTTP 200 | ✓ PASS |
| Gate 6 | 페이지 소스 옛 env 흔적 0건 | ✓ PASS |

---

## 6. 다음 단계 — 시크릿 rotation (사장 손)

현재 `.env.local` 과 Vercel env 에 있는 키들은 옛 키 그대로입니다. 보안 강화를 위해 순서대로 rotation 권장:

| 서비스 | 작업 | 우선순위 |
|---|---|---|
| Telegram BotFather | 봇 토큰 재발급 (`TELEGRAM_BOT_TOKEN_*`) | 높음 |
| Google Cloud Console | Service Account 새 키 발급 (`GOOGLE_PRIVATE_KEY`) | 높음 |
| Supabase | (INACTIVE 상태 = 후순위) | 낮음 |
| 토스페이먼츠 | (사용 X = skip) | — |

새 키 발급 후 → `STEP_129` 명령서로 env swap + redeploy.

---

## 변경 이력

- **2026-05-27**: STEP_128 자율 실행 완료. Vercel env 13개 잔존 0 확인 + Supabase INACTIVE 확인 + redeploy + Gate 6/6 통과.
