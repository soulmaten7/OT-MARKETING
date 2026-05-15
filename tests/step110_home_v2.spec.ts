import { test, expect } from '@playwright/test'

test.describe('STEP_110 — 홈 히어로 v2 검증 (로컬 full 모드)', () => {
    test('3 풀와이드 카드 = 세로 배치', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 })
        await page.goto('http://localhost:3000/')
        await page.waitForLoadState('networkidle')
        const c1 = await page.getByRole('heading', { name: '구독형 랜딩페이지' }).boundingBox()
        const c2 = await page.getByRole('heading', { name: 'CPA 광고' }).boundingBox()
        const c3 = await page.getByRole('heading', { name: '문자문의 만들기' }).boundingBox()
        expect(c2!.y).toBeGreaterThan(c1!.y)
        expect(c3!.y).toBeGreaterThan(c2!.y)
    })

    test('각 카드 = 비주얼 + HTML 텍스트 (베네핏)', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 })
        await page.goto('http://localhost:3000/')
        await page.waitForLoadState('networkidle')
        await expect(page.getByText('코딩 없이 5분 만에 완성')).toBeVisible()
        await expect(page.getByText('블로그·SNS·명함 어디에든 문의 버튼 배치')).toBeVisible()
        // 히어로 이미지 존재 확인
        const heroImg = page.locator('img[alt="구독형 랜딩페이지 서비스 화면"]')
        await expect(heroImg).toBeAttached()
    })

    test('"왜 OT" 섹션 + 최종 CTA', async ({ page }) => {
        await page.goto('http://localhost:3000/')
        await page.waitForLoadState('networkidle')
        await expect(page.getByRole('heading', { name: /따로따로 쓰지 마세요/ })).toBeVisible()
        await expect(page.getByText('한 계정에서 전부')).toBeVisible()
        // 최종 CTA 버튼
        const ctaLink = page.getByRole('link', { name: '무료로 시작하기' }).last()
        await expect(ctaLink).toBeVisible()
    })

    test('빈 공간 제거 — footer 가 합리적 거리', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 })
        await page.goto('http://localhost:3000/')
        await page.waitForLoadState('networkidle')
        const lastCard = await page.getByRole('heading', { name: '문자문의 만들기' }).boundingBox()
        const footer = await page.locator('footer').boundingBox()
        expect(footer!.y - lastCard!.y).toBeLessThan(2000)
    })

    test('모바일 = 구독형 랜딩페이지 카드 표시', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 })
        await page.goto('http://localhost:3000/')
        await page.waitForLoadState('networkidle')
        await expect(page.getByRole('heading', { name: '구독형 랜딩페이지' })).toBeVisible()
        await expect(page.getByText('코딩 없이 5분 만에 완성')).toBeVisible()
    })
})
