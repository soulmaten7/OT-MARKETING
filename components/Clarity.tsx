"use client";
import Script from "next/script";

/**
 * STEP_92.4 — Microsoft Clarity 통합
 * NEXT_PUBLIC_CLARITY_PROJECT_ID 환경변수 박힐 때만 활성. 미박힘 시 null (no-op).
 *
 * 사용: LP 사용자 행동 분석 (Step 1·4 이탈 지점 추적, heatmap, session recording)
 * 100% 무료 + 무제한 세션 + 한국 사용 가능.
 */
export default function Clarity() {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
    if (!projectId) return null;

    return (
        <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${projectId}");
            `}
        </Script>
    );
}
