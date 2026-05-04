/**
 * STEP_58 — Google Ads gtag 헬퍼
 * client-side 만 동작 (window.gtag 미박힘 시 silent no-op)
 */

type GtagArgs = [...unknown[]];

declare global {
    interface Window {
        gtag?: (...args: GtagArgs) => void;
        dataLayer?: unknown[];
    }
}

/**
 * Google Ads Conversion 이벤트
 * 자가진단 완료 시 (Lead) 호출. 가치 ₩30,000 (사장 CPL 기준 보수적).
 *
 * NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID 형식 = "AW-1234567890/AbCdEfGhIjKlMnO"
 * (전환 ID + "/" + 전환 라벨)
 */
export function trackGoogleAdsConversion(value: number = 30000, currency: string = "KRW") {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID?.trim();
    if (!conversionId) {
        console.warn("[gtag] NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID 미박힘. Conversion skip.");
        return;
    }

    window.gtag("event", "conversion", {
        send_to: conversionId,
        value,
        currency,
    });
}

/**
 * Google Ads 일반 이벤트 (Step 도달 등 잠재고객 깔때기 추적)
 */
export function trackGoogleAdsEvent(eventName: string, params?: Record<string, unknown>) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    if (params) window.gtag("event", eventName, params);
    else window.gtag("event", eventName);
}
