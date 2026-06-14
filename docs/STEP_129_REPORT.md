# STEP_129 REPORT — Google Service Account 키 rotation

> 작성일: 2026-05-27 | 모델: Sonnet | 자율 실행 완료

---

## 1. Phase 0 — 백업 + 도구 확인

- `.env.local` 백업: `~/OTMarketing/_BACKUP/.env.local.before_key_rotation_20260527_110417` ✓
- JSON 파일 위치: `/Users/maegbug/OTMarketing/rare-discipline-433323-s2-aa5ba9427eac.json` ✓
- JSON 유효성:
  - `project_id`: `rare-discipline-433323-s2`
  - `client_email`: `sheet-bot@rare-discipline-433323-s2.iam.gserviceaccount.com`
  - `private_key_id`: `aa5ba9427eac483ae9beba07a4a0e3a2e0112363` (신규)

---

## 2. Phase 1 — private_key 추출 검증

- 길이: 1704자 ✓
- BEGIN PRIVATE KEY 헤더: ✓
- END PRIVATE KEY 푸터: ✓
- (값 자체는 로그 미출력)

---

## 3. Phase 2 — `.env.local` GOOGLE_PRIVATE_KEY 교체

- 교체 전: 옛 키 (key_id: `6500f1bf...`)
- 교체 후: 신규 키 (key_id: `aa5ba9427eac...`)
- 라인 길이: 1754자 (BEGIN/END 포함 따옴표) ✓

---

## 4. Phase 3 — Vercel env GOOGLE_PRIVATE_KEY 교체

| 환경 | 제거 | 추가 |
|---|---|---|
| production | ✓ 제거 완료 | ✓ 신규 추가 (Encrypted) |
| preview | 없었음 (정상) | — |
| development | 없었음 (정상) | — |

- Vercel 에 Encrypted 상태로 추가 확인 ✓

---

## 5. Phase 4 — JSON 파일 안전 삭제

- 3회 랜덤 바이트 덮어쓰기 (DoD 방식) ✓
- `rm` 삭제 완료 ✓
- `ls` 확인: No such file ✓

---

## 6. Phase 5 — production 재배포

- `vercel --prod` 실행 완료 ✓
- 빌드 시간: 35s ✓
- 배포 URL: `ot-marketing-source-15877p3co-toms-projects-c798474e.vercel.app`

---

## 7. Phase 6 — 라이브 검증

| 검증 항목 | 결과 |
|---|---|
| `ot-marketing.kr/` → 308 | ✓ |
| `www.ot-marketing.kr/` → 307 → `/cpa` | ✓ |
| `/cpa` HTTP 200 | ✓ |
| 페이지 소스 옛 env 흔적 (supabase·fbq·clarity) | 0건 ✓ |

---

## 8. 게이트 8/8 통과

| Gate | 내용 | 결과 |
|---|---|---|
| Gate 1 | `.env.local` 백업 존재 | ✓ PASS |
| Gate 2 | JSON 파일 삭제 확인 | ✓ PASS |
| Gate 3 | `.env.local` 새 GOOGLE_PRIVATE_KEY 존재 | ✓ PASS |
| Gate 4 | Vercel production GOOGLE_PRIVATE_KEY 존재 | ✓ PASS |
| Gate 5 | 유지 변수 4/4 존재 | ✓ PASS |
| Gate 6 | `/cpa` HTTP 200 | ✓ PASS |
| Gate 7 | 페이지 소스 옛 env 흔적 0건 | ✓ PASS |
| Gate 8 | 옛 Supabase 변수 Vercel 잔존 0 | ✓ PASS |

---

## 9. 사장 손 작업 (필수)

### ① Google Cloud Console — 옛 키 삭제
1. https://console.cloud.google.com → `rare-discipline-433323-s2` 프로젝트
2. IAM 및 관리자 → 서비스 계정 → `sheet-bot@...` 클릭
3. 키 탭 → 키 ID `6500f1bffae00a97db5e9f5a124119bc21b849ce` → 삭제
4. 신규 키 `aa5ba9427eac...` 만 남아있으면 완료

### ② macOS 휴지통 비우기
- Finder → 독 휴지통 우클릭 → "휴지통 비우기"

### ③ (선택) `/cpa` 문의 폼 실제 제출 테스트
- `www.ot-marketing.kr/cpa` → 문의 폼 제출 → 구글 시트 입력 확인

---

## 10. 완료 후 상태

| 서비스 | 상태 |
|---|---|
| Google Service Account 키 | ✓ 신규 키 적용 완료 |
| `.env.local` | ✓ 신규 키 교체 |
| Vercel production | ✓ 신규 키 Encrypted 저장 |
| JSON 파일 | ✓ 3회 덮어쓰기 후 삭제 |
| 사이트 라이브 | ✓ `/cpa` 200 |

---

## 변경 이력

- **2026-05-27**: STEP_129 자율 실행 완료. Google Service Account 키 rotation + Vercel env 교체 + JSON 안전 삭제 + redeploy + Gate 8/8 통과.
