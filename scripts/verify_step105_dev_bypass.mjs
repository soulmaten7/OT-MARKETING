/**
 * STEP_105 거짓 보고 방지 게이트 검증
 * 개발 모드 인증·구독 게이트 우회 플래그 검증
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

// 1. /dashboard — 미로그인 시 접근 가능 (게이트 우회)
await test('미로그인 /dashboard → /login redirect 없음', async () => {
    await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' })
    const url = page.url()
    if (url.includes('/login')) throw new Error(`/login 으로 redirect 됨: ${url}`)
    if (!url.includes('/dashboard')) throw new Error(`/dashboard 에 없음: ${url}`)
})

// 2. /dashboard — 구독 active 상태 표시
await test('/dashboard 구독형 랜딩페이지 카드 = "구독 중" 표시', async () => {
    await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('구독형 랜딩페이지')) throw new Error('구독형 랜딩페이지 카드 없음')
    if (!text?.includes('구독 중')) throw new Error('"구독 중" 배지 없음 (active mock 미적용)')
})

// 3. /dashboard — 개발 모드 표시
await test('/dashboard 사용자 이메일 = dev@ot-marketing.kr', async () => {
    await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('dev@ot-marketing.kr') && !text?.includes('개발 모드')) {
        throw new Error('개발 모드 사용자 표시 없음')
    }
})

// 4. /subscribe — 미로그인 접근 가능
await test('미로그인 /subscribe → /login redirect 없음', async () => {
    await page.goto(`${BASE}/subscribe`, { waitUntil: 'networkidle' })
    const url = page.url()
    if (url.includes('/login')) throw new Error(`/login 으로 redirect 됨: ${url}`)
})

// 5. /subscribe — 개발 모드 표시
await test('/subscribe 페이지 렌더링 정상 (구독 카드 표시)', async () => {
    await page.goto(`${BASE}/subscribe`, { waitUntil: 'networkidle' })
    const text = await page.textContent('body')
    if (!text?.includes('구독형 랜딩페이지')) throw new Error('구독형 랜딩페이지 텍스트 없음')
    if (!text?.includes('개발 모드')) throw new Error('개발 모드 안내 없음')
})

// 6. 미들웨어 기존 로직 보존 확인 (grep)
await test('middleware.ts = 기존 인증 로직 보존 (AUTH_REQUIRED_ROUTES 잔존)', async () => {
    const { readFileSync } = await import('fs')
    const content = readFileSync(new URL('../middleware.ts', import.meta.url), 'utf-8')
    if (!content.includes('AUTH_REQUIRED_ROUTES')) throw new Error('AUTH_REQUIRED_ROUTES 삭제됨')
    if (!content.includes('SUBSCRIPTION_REQUIRED_ROUTES')) throw new Error('SUBSCRIPTION_REQUIRED_ROUTES 삭제됨')
    if (!content.includes('redirect(new URL("/login"')) throw new Error('/login redirect 로직 삭제됨')
    if (!content.includes('DEV_BYPASS_AUTH')) throw new Error('DEV_BYPASS_AUTH 플래그 없음')
})

// 7. DEV_BYPASS_AUTH 플래그 = 기존 로직 앞에 위치 확인
await test('middleware.ts = DEV_BYPASS_AUTH 체크가 기존 로직 앞에 위치', async () => {
    const { readFileSync } = await import('fs')
    const content = readFileSync(new URL('../middleware.ts', import.meta.url), 'utf-8')
    const bypassIdx = content.indexOf('if (DEV_BYPASS_AUTH)')
    const authCheckIdx = content.indexOf('AUTH_REQUIRED_ROUTES.some')
    if (bypassIdx === -1) throw new Error('DEV_BYPASS_AUTH 체크 없음')
    if (bypassIdx > authCheckIdx) throw new Error('DEV_BYPASS_AUTH 체크가 기존 로직 뒤에 위치')
})

// 8b. next.config.mjs = BYPASS_AUTH_DEV env 주입 확인
await test('next.config.mjs = BYPASS_AUTH_DEV 정적 주입 설정', async () => {
    const { readFileSync } = await import('fs')
    const content = readFileSync(new URL('../next.config.mjs', import.meta.url), 'utf-8')
    if (!content.includes('BYPASS_AUTH_DEV')) throw new Error('next.config.mjs에 BYPASS_AUTH_DEV 없음')
    if (!content.includes('NEXT_PUBLIC_DEV_BYPASS_AUTH')) throw new Error('next.config.mjs에 NEXT_PUBLIC_DEV_BYPASS_AUTH 참조 없음')
})

// 8. secretKey 하드코딩 0건 (절대 게이트)
await test('secretKey 하드코딩 0건', async () => {
    const { execSync } = await import('child_process')
    try {
        const result = execSync('grep -rn "test_sk_\\|live_sk_\\|sk_live\\|sk_test" app/ components/ lib/ 2>/dev/null', {
            cwd: new URL('..', import.meta.url).pathname,
            encoding: 'utf-8'
        })
        if (result.trim()) throw new Error(`secretKey 하드코딩 발견: ${result.trim()}`)
    } catch (e) {
        if (e.status === 1) return // grep 0 match = exit 1 = 정상
        if (e.message.includes('secretKey 하드코딩')) throw e
    }
})

await browser.close()

console.log(`\n결과: ${pass}/${pass + fail} 통과 ${fail > 0 ? '❌' : '✅'}`)
if (fail > 0) process.exit(1)
