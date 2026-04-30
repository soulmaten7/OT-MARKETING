"use client";

import { useEffect, useRef, useState } from "react";

export function SamplesIframe() {
    const ref = useRef<HTMLIFrameElement>(null);
    const [height, setHeight] = useState<number>(400);  // 600 → 400 변경 (의도적, 새 hash 강제)

    useEffect(() => {
        let lastIncoming = 0;
        const handler = (e: MessageEvent) => {
            const data = e.data;
            if (!data || typeof data !== "object") return;
            if (data.type !== "samples-resize") return;
            const incoming = typeof data.height === "number" ? data.height : 0;
            if (incoming < 100) return;  // 비정상 작은 값 무시
            if (Math.abs(incoming - lastIncoming) < 5) return;
            lastIncoming = incoming;
            setHeight(Math.max(400, incoming));
        };
        window.addEventListener("message", handler);
        // 디버그: listener 등록 확인용 (한 번만)
        console.log("[SamplesIframe] message listener registered v2");
        return () => {
            window.removeEventListener("message", handler);
        };
    }, []);

    return (
        <iframe
            ref={ref}
            src="/samples.html"
            style={{ width: "100%", height: `${height}px`, border: 0 }}
            title="CPA 랜딩페이지 디자인 템플릿 10종"
            data-version="v2"  // 캐시 무효화용 attribute
        />
    );
}
