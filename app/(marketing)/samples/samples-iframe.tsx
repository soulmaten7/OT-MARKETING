"use client";

import { useEffect, useRef, useState } from "react";

export function SamplesIframe() {
    const ref = useRef<HTMLIFrameElement>(null);
    const [height, setHeight] = useState(2400);

    useEffect(() => {
        const handler = (e: MessageEvent) => {
            const data = e.data;
            if (!data || data.type !== "samples-resize") return;
            const incoming = typeof data.height === "number" ? data.height : 0;
            setHeight(Math.max(2400, incoming));
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, []);

    return (
        <iframe
            ref={ref}
            src="/samples.html"
            style={{ width: "100%", height: `${height}px`, border: 0 }}
            title="랜딩페이지 디자인 시안 6종"
        />
    );
}
