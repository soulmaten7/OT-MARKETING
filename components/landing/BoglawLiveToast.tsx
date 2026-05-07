"use client";

/**
 * STEP_71 — 보광 라이브 토스트 (하이브리드)
 *
 * Phase A (DB 5건 미만) = "📊 지금까지 N명이 무료 자가진단 완료"
 * Phase B (DB 5건+) = 최근 10 행 익명화 + 5초 간격 회전
 *
 * 위치 = 화면 하단 fixed center
 * fetch = 30초 간격 (api 캐싱과 align)
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastResponse =
    | { phase: "counter"; total: number }
    | { phase: "live"; recent: { name: string; action: string; elapsed: string }[] };

export function BoglawLiveToast() {
    const [data, setData] = useState<ToastResponse | null>(null);
    const [currentIdx, setCurrentIdx] = useState(0);

    // fetch (30 초 간격)
    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            try {
                const res = await fetch("/api/boglaw-live-toast", { cache: "no-store" });
                if (!res.ok) return;
                const json = (await res.json()) as ToastResponse;
                if (!cancelled) setData(json);
            } catch {
                // ignore — 토스트는 부가 기능, 본 폼 작동에 영향 X
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, []);

    // Phase B 회전 (5초 간격)
    useEffect(() => {
        if (!data || data.phase !== "live" || data.recent.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIdx((i) => (i + 1) % data.recent.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [data]);

    if (!data) return null;

    let key = "init";
    let content: React.ReactNode;
    if (data.phase === "counter") {
        key = `counter-${data.total}`;
        content = (
            <>
                <span style={{ marginRight: 6 }}>📊</span>
                <span>지금까지 <b>{data.total}명</b>이 무료 자가진단 완료</span>
            </>
        );
    } else {
        const item = data.recent[currentIdx % data.recent.length];
        if (!item) return null;
        key = `live-${currentIdx}-${item.name}`;
        content = (
            <>
                <span style={{
                    display: "inline-block",
                    width: 8, height: 8, borderRadius: 9999,
                    background: "#10B981",
                    marginRight: 8,
                    animation: "pulse 2s ease-in-out infinite",
                }} />
                <span>
                    <b>{item.name}</b> 님이 {item.elapsed} {item.action}했습니다
                </span>
            </>
        );
    }

    return (
        <>
            <style>{`
                @keyframes pulse {
                    from { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(0.85); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
            <div
                aria-live="polite"
                style={{
                    position: "fixed",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 50,
                    pointerEvents: "none",
                    width: "auto",
                    maxWidth: "calc(100vw - 32px)",
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            background: "rgba(255, 255, 255, 0.96)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid #e5e7eb",
                            borderRadius: 9999,
                            padding: "8px 16px",
                            fontSize: 13,
                            color: "#374151",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                            display: "inline-flex",
                            alignItems: "center",
                            whiteSpace: "nowrap",
                            maxWidth: "calc(100vw - 32px)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
}
