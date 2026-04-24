"use client";

import { useEffect, useRef, useState } from "react";

/**
 * /showcase 의 iframe 래퍼.
 *
 * samples.html 이 window.parent.postMessage({ type: 'showcase-resize', height })
 * 로 active 시안 높이를 송신. 이 컴포넌트가 수신해 iframe height 를 동적으로 조절.
 *
 * 결과: iframe 내부 스크롤 없이 active 시안 전체가 보임.
 * 탭 전환 시마다 해당 시안 높이에 맞춰 리사이즈됨.
 */
export function ShowcaseIframe() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [height, setHeight] = useState<number>(1400); // 초기 기본값

    useEffect(() => {
        function onMessage(e: MessageEvent) {
            const data = e.data;
            if (!data || data.type !== "showcase-resize") return;
            if (typeof data.height !== "number") return;
            // 안전 범위: 최소 800, 최대 6000 px
            const clamped = Math.max(800, Math.min(data.height, 6000));
            setHeight(clamped);
        }
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, []);

    return (
        <iframe
            ref={iframeRef}
            src="/samples.html"
            title="랜딩페이지 디자인 시안"
            className="w-full border-0 block"
            style={{ height: `${height}px` }}
            scrolling="no"
        />
    );
}
