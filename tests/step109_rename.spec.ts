import { test, expect } from '@playwright/test'

test.describe('STEP_109 — 기능 이름 변경 검증 (로컬 full 모드)', () => {
    test('헤더 = 구독형 랜딩페이지 + 문자문의 만들기', async ({ page }) => {
        await page.goto('http://localhost:3000/')
        await page.setViewportSize({ width: 1280, height: 720 })
        const header = page.locator('header')
        await expect(header.getByRole('link', { name: '구독형 랜딩페이지' })).toBeVisible()
        await expect(header.getByRole('link', { name: '문자문의 만들기' })).toBeVisible()
        const headerText = await header.textContent()
        expect(headerText).not.toContain('블로그문자')
    })

    test('홈 카드 = 문자문의 만들기 + 실제 베네핏', async ({ page }) => {
        await page.goto('http://localhost:3000/')
        await expect(page.getByText('문자문의 만들기').first()).toBeVisible()
        await expect(page.getByText(/어디에든 문의 버튼/).first()).toBeVisible()
        await expect(page.getByText('블로그 글 자동 생성')).not.toBeVisible()
    })

    test('"블로그문자" 표시 텍스트 0건 (전체 페이지)', async ({ page }) => {
        for (const route of ['/', '/blog-sms', '/landing-pages']) {
            await page.goto(`http://localhost:3000${route}`)
            await page.waitForLoadState('networkidle')
            const body = await page.locator('body').textContent()
            expect(body, `${route} 에 블로그문자 잔여`).not.toContain('블로그문자')
        }
    })

    test('라우트 URL 무변경 (/blog-sms 정상)', async ({ page }) => {
        await page.goto('http://localhost:3000/blog-sms')
        await expect(page).toHaveURL(/\/blog-sms/)
    })
})
