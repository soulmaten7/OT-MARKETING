import { test, expect } from '@playwright/test'

test.describe('STEP_110.1 — 홈 히어로 fix 검증', () => {
    test('Hero = 페이지 로드 시 즉시 선명 (opacity 1)', async ({ page }) => {
        await page.goto('http://localhost:3000/')
        await page.waitForTimeout(800)
        const hero = page.getByRole('heading', { level: 1 })
        const opacity = await hero.evaluate(el => getComputedStyle(el).opacity)
        expect(parseFloat(opacity)).toBeGreaterThan(0.9)
    })

    test('1번 카드 = 제목·베네핏 즉시 표시', async ({ page }) => {
        await page.goto('http://localhost:3000/')
        await page.waitForTimeout(800)
        await expect(page.getByRole('heading', { name: '구독형 랜딩페이지' })).toBeVisible()
        await expect(page.getByText('코딩 없이 5분 만에 완성')).toBeVisible()
    })

    test('"왜 OT" 섹션 = 이모지 0건', async ({ page }) => {
        await page.goto('http://localhost:3000/')
        await page.getByRole('heading', { name: /따로따로 쓰지 마세요/ }).scrollIntoViewIfNeeded()
        await page.waitForTimeout(500)
        const section = page.locator('section', { hasText: '따로따로 쓰지' })
        const text = await section.textContent()
        expect(text).not.toMatch(/[🔗✅🏷️📊🎯✉️]/)
    })

    test('2·3번 카드 = 스크롤 진입 후 표시', async ({ page }) => {
        await page.goto('http://localhost:3000/')
        await page.getByRole('heading', { name: 'CPA 광고' }).scrollIntoViewIfNeeded()
        await page.waitForTimeout(800)
        await expect(page.getByRole('heading', { name: 'CPA 광고' })).toBeVisible()
    })
})
