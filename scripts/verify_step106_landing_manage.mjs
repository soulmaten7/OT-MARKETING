/**
 * STEP_106 거짓 보고 방지 게이트 검증
 * 구독형 랜딩페이지 관리 페이지 골격
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

// 1. /landing-pages/manage 접근 가능 (개발 모드)
await test('/landing-pages/manage 접근 가능 (게이트 우회)', async () => {
    await page.goto(`${BASE}/landing-pages/manage`, { waitUntil: 'networkidle' })
    const url = page.url()
    if (url.includes('/login') || url.includes('/pricing')) throw new Error(`redirect 됨: ${url}`)
    if (!url.includes('/landing-pages/manage')) throw new Error(`manage 페이지 아님: ${url}`)
})

// 2. "내 랜딩페이지" 타이틀
await test('"내 랜딩페이지" 제목 표시', async () => {
    await page.goto(`${BASE}/landing-pages/manage`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('내 랜딩페이지')) throw new Error('"내 랜딩페이지" 없음')
})

// 3. LP 카드 또는 빈 상태
await test('LP 카드(data-testid=lp-card) 또는 빈 상태 텍스트', async () => {
    await page.goto(`${BASE}/landing-pages/manage`, { waitUntil: 'networkidle' })
    const cardCount = await page.locator('[data-testid="lp-card"]').count()
    const emptyCount = await page.getByText(/아직.*없어요/).count()
    if (cardCount + emptyCount === 0) throw new Error('LP 카드도 빈 상태도 없음')
})

// 4. 개발 모드 = LP 카드 2개 표시
await test('개발 모드 = LP mock 카드 2개', async () => {
    await page.goto(`${BASE}/landing-pages/manage`, { waitUntil: 'networkidle' })
    const cardCount = await page.locator('[data-testid="lp-card"]').count()
    if (cardCount < 2) throw new Error(`LP 카드 ${cardCount}개 (2개 기대)`)
})

// 5. "새 랜딩페이지" 버튼 (헤더 또는 하단 카드)
await test('"새 랜딩페이지" 버튼 존재', async () => {
    await page.goto(`${BASE}/landing-pages/manage`, { waitUntil: 'networkidle' })
    const btn = page.getByText(/새 랜딩페이지|만들기/).first()
    await btn.waitFor({ state: 'visible', timeout: 5000 })
})

// 6. 새 랜딩페이지 → 업종 선택 페이지 이동
await test('"새 랜딩페이지" 클릭 → /manage/new 이동', async () => {
    await page.goto(`${BASE}/landing-pages/manage`, { waitUntil: 'networkidle' })
    await page.getByRole('link', { name: /새 랜딩페이지/ }).first().click()
    await page.waitForURL(/\/manage\/new/, { timeout: 5000 })
})

// 7. /manage/new = 업종 선택 화면 + 6 업종
await test('/manage/new = "어떤 업종" + 6 업종 표시', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('어떤 업종')) throw new Error('"어떤 업종" 텍스트 없음')
    if (!text?.includes('개인회생')) throw new Error('개인회생 업종 없음')
    if (!text?.includes('정수기')) throw new Error('정수기 업종 없음')
    if (!text?.includes('인터넷')) throw new Error('인터넷 업종 없음')
    if (!text?.includes('주식')) throw new Error('주식 업종 없음')
    if (!text?.includes('부동산')) throw new Error('부동산 업종 없음')
    if (!text?.includes('의료')) throw new Error('의료 업종 없음')
})

// 8. 업종 클릭 → 빌더 placeholder 페이지 이동
await test('개인회생 업종 클릭 → /manage/new/debt', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new`, { waitUntil: 'networkidle' })
    await page.getByText('개인회생·파산').click()
    await page.waitForURL(/\/manage\/new\/debt/, { timeout: 5000 })
})

// 9. 빌더 placeholder = STEP_107 안내
await test('/manage/new/debt = STEP_107 준비 중 안내', async () => {
    await page.goto(`${BASE}/landing-pages/manage/new/debt`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('STEP_107') && !text?.includes('준비 중')) throw new Error('STEP_107 안내 없음')
})

// 10. 대시보드 → 관리 페이지 연계 (구독 active = 내 랜딩페이지 관리 링크)
await test('대시보드 → 내 랜딩페이지 관리 링크', async () => {
    await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' })
    const link = page.getByRole('link', { name: /랜딩페이지 관리|내 랜딩페이지/ }).first()
    const href = await link.getAttribute('href')
    if (!href?.includes('/landing-pages/manage')) throw new Error(`관리 페이지 링크 없음: ${href}`)
})

// 11. 대시보드 = LP 개수 요약 (랜딩페이지 N개)
await test('대시보드 = "랜딩페이지 2개" 요약 표시', async () => {
    await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('랜딩페이지 2개')) throw new Error('LP 개수 요약 없음')
})

// 12. 구 자산 무영향 (/landing-pages 소개 페이지)
await test('/landing-pages 소개 페이지 200 유지', async () => {
    const resp = await page.goto(`${BASE}/landing-pages`, { waitUntil: 'networkidle' })
    if (resp?.status() !== 200) throw new Error(`/landing-pages ${resp?.status()}`)
    const text = await page.textContent('body')
    if (!text?.includes('구독형 랜딩페이지')) throw new Error('소개 페이지 내용 없음')
})

// 13. DS primary color button 확인
await test('/manage/new 업종 선택 버튼 스타일 (토스 블루)', async () => {
    await page.goto(`${BASE}/landing-pages/manage`, { waitUntil: 'networkidle' })
    const btn = page.getByRole('link', { name: /새 랜딩페이지/ }).first()
    const bg = await btn.evaluate(el => getComputedStyle(el).backgroundColor)
    if (bg !== 'rgb(49, 130, 246)') throw new Error(`primary color 아님: ${bg}`)
})

await browser.close()

console.log(`\n결과: ${pass}/${pass + fail} 통과 ${fail > 0 ? '❌' : '✅'}`)
if (fail > 0) process.exit(1)
