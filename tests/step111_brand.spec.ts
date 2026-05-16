import { test, expect } from '@playwright/test'

test.describe('STEP_111 — One Trillion 브랜드 적용 검증', () => {
    test('헤더 로고 = One Trillion alt + logo-one-trillion src', async ({ page }) => {
        await page.goto('http://localhost:3000/')
        const logo = page.locator('header img').first()
        await expect(logo).toHaveAttribute('alt', 'One Trillion')
        const src = await logo.getAttribute('src')
        expect(src).toContain('one-trillion')
    })

    test('title = One Trillion (OT MARKETING 0건)', async ({ page }) => {
        await page.goto('http://localhost:3000/')
        const title = await page.title()
        expect(title).toContain('One Trillion')
        expect(title).not.toContain('OT MARKETING')
    })

    test('favicon.ico 응답 200', async ({ page }) => {
        const res = await page.request.get('http://localhost:3000/favicon.ico')
        expect(res.status()).toBe(200)
    })

    test('footer = One Trillion + OTMarketing 사업자 정보 잔존', async ({ page }) => {
        await page.goto('http://localhost:3000/')
        const footer = page.locator('footer')
        await expect(footer.getByText('One Trillion').first()).toBeVisible()
        await expect(footer.getByText(/OTMarketing|사업자등록번호/).first()).toBeVisible()
    })

    test('헤더 영역 "OT MARKETING" 0건', async ({ page }) => {
        await page.goto('http://localhost:3000/')
        const headerText = await page.locator('header').textContent()
        expect(headerText).not.toContain('OT MARKETING')
        const title = await page.title()
        expect(title).not.toContain('OT MARKETING')
    })
})
