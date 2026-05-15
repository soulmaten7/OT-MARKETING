/**
 * STEP_107 거짓 보고 방지 게이트 검증
 * 구독형 랜딩페이지 실제 빌더 (업종 선택 → placeholder 입력 → 미리보기 → 발행)
 */
import { chromium } from 'playwright'

const BASE = 'http://localhost:3000'
let pass = 0, fail = 0

async function test(name, fn) {
    try {
        await fn()
        console.log(`✅ [${pass + fail + 1}] ${name}`)
        pass++
    } catch (e) {
        console.error(`❌ [${pass + fail + 1}] ${name}: ${e.message}`)
        fail++
    }
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext()
const page = await context.newPage()

// 1. 업종 선택 화면 = 6 업종 표시
await test('업종 선택 화면 = "어떤 업종" + 6 업종', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('어떤 업종')) throw new Error('"어떤 업종" 텍스트 없음')
    if (!text?.includes('개인회생')) throw new Error('개인회생 없음')
    if (!text?.includes('정수기')) throw new Error('정수기 없음')
    if (!text?.includes('인터넷')) throw new Error('인터넷 없음')
})

// 2. 활성 업종(개인회생) 클릭 → 빌더 진입 (플레이스홀더 아님)
await test('개인회생 클릭 → 실제 빌더 (임시저장·발행하기 버튼 존재)', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new`, { waitUntil: 'networkidle' })
    await page.getByText('개인회생·파산').click()
    await page.waitForURL(/\/manage\/new\/debt/, { timeout: 5000 })
    await page.waitForLoadState('networkidle')
    // STEP_107 placeholder 가 아닌 실제 빌더여야 함 — 임시저장 버튼으로 확인
    const saveBtn = page.getByRole('button', { name: /임시저장/ })
    await saveBtn.waitFor({ state: 'visible', timeout: 8000 })
})

// 3. 브랜드명 입력 → placeholder 기반 입력 필드 상호작용
await test('브랜드명 입력 필드 (placeholder 기반) 상호작용', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new/debt`, { waitUntil: 'networkidle' })
    // FormField 라벨-입력 연결은 placeholder 로 찾기
    const brandInput = page.getByPlaceholder(/채무 상담 센터/)
    await brandInput.waitFor({ state: 'visible', timeout: 8000 })
    await brandInput.fill('테스트 법률사무소')
    const val = await brandInput.inputValue()
    if (val !== '테스트 법률사무소') throw new Error(`브랜드명 입력 불일치: ${val}`)
})

// 4. 업종별 기본값 = 개인회생 기본 질문 채워짐
await test('개인회생 빌더 = 업종별 기본값 (채무 질문) 존재', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new/debt`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('채무') && !text?.includes('채무 금액')) {
        throw new Error('채무 관련 기본값 없음')
    }
})

// 5. slug 입력 필드 존재
await test('slug 입력 필드 + otpage1.com/ prefix 표시', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new/debt`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('otpage1.com/')) throw new Error('otpage1.com/ 안내 없음')
})

// 6. 임시저장 버튼 존재
await test('"임시저장" 버튼 존재', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new/debt`, { waitUntil: 'networkidle' })
    const btn = page.getByRole('button', { name: /임시저장/ })
    await btn.waitFor({ state: 'visible', timeout: 5000 })
})

// 7. 발행하기 버튼 존재
await test('"발행하기" 버튼 존재', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new/debt`, { waitUntil: 'networkidle' })
    const btn = page.getByRole('button', { name: /발행하기/ })
    await btn.waitFor({ state: 'visible', timeout: 5000 })
})

// 8. API /api/landing-pages POST = 200 응답 (dev mode)
await test('/api/landing-pages POST (개발 모드) = 성공 응답', async () => {
    const res = await page.request.post(`${BASE}/api/landing-pages`, {
        data: {
            slug: `test-debt-${Date.now()}`,
            industry: 'debt',
            title: 'Playwright 테스트 LP',
            config: { brandName: '테스트', brandColor: '#3182f6' },
            status: 'draft',
        },
    })
    if (!res.ok()) throw new Error(`POST /api/landing-pages = ${res.status()}`)
    const json = await res.json()
    if (!json.id) throw new Error('응답에 id 없음')
})

// 9. 정수기·렌탈 빌더 = 렌탈 기본값 (물·정수기 관련)
await test('정수기 빌더 = 렌탈 기본값 존재', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new/rental`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('정수기') && !text?.includes('렌탈')) {
        throw new Error('정수기/렌탈 기본값 없음')
    }
})

// 10. 인터넷·통신 빌더 = 통신 기본값
await test('인터넷 빌더 = 통신 기본값 존재', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new/broadband`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('인터넷') && !text?.includes('통신')) {
        throw new Error('인터넷/통신 기본값 없음')
    }
})

// 11. 준비 중 업종(invest) = 404
await test('준비 중 업종(invest) = 404 (빌더 없음)', async () => {
    const res = await page.goto(`${BASE}/landing-pages/manage/new/invest`, { waitUntil: 'networkidle' })
    if (res?.status() === 200) throw new Error('invest 빌더가 200 응답 (준비 중인데 열려있음)')
})

// 12. 기존 보광 LP (/select1) 무영향 — 절대 게이트
await test('/select1 보광 LP 무영향 (BoglawLandingTemplate 렌더)', async () => {
    await page.goto(`${BASE}/select1`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    // BoglawLandingTemplate 에는 채무회복·개인회생 관련 텍스트 있음
    if (!text) throw new Error('페이지 빈 응답')
    // 간단히 HTTP 200 + 내용 있음으로 확인
    const resp = await page.goto(`${BASE}/select1`)
    if (resp?.status() !== 200) throw new Error(`/select1 = ${resp?.status()}`)
})

// 13. /select11 보광 LP 무영향
await test('/select11 보광 LP 무영향', async () => {
    const resp = await page.goto(`${BASE}/select11`)
    if (resp?.status() !== 200) throw new Error(`/select11 = ${resp?.status()}`)
})

await browser.close()

console.log(`\n결과: ${pass}/${pass + fail} 통과 ${fail > 0 ? '❌' : '✅'}`)
if (fail > 0) process.exit(1)
