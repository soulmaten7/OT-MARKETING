/**
 * STEP_55 — Meta Pixel 헬퍼
 * client-side 만 동작 (window.fbq 미박힘 시 silent no-op)
 */

type FbqArgs = [...unknown[]];

declare global {
    interface Window {
        fbq?: (...args: FbqArgs) => void;
    }
}

/** 표준 Meta event (Lead·Purchase 등) */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
        if (params) window.fbq("track", eventName, params);
        else window.fbq("track", eventName);
    }
}

/** 사용자 정의 event (DiagnosisStart 등) */
export function trackCustom(eventName: string, params?: Record<string, unknown>) {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
        if (params) window.fbq("trackCustom", eventName, params);
        else window.fbq("trackCustom", eventName);
    }
}
