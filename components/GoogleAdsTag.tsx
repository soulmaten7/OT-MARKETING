"use client";
import Script from "next/script";

/**
 * STEP_58 — Google Ads gtag.js 통합
 * NEXT_PUBLIC_GOOGLE_ADS_ID 환경변수 박힐 때만 활성. 미박힘 시 null (no-op).
 */
export default function GoogleAdsTag() {
    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
    if (!adsId) return null;

    return (
        <>
            <Script
                id="google-ads-gtag-loader"
                src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
                strategy="afterInteractive"
            />
            <Script id="google-ads-gtag-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${adsId}');
                `}
            </Script>
        </>
    );
}
