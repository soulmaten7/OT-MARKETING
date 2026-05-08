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
        // STEP_84 — 회전 간격 5초 → 8초 (사장 진단: 너무 빠름)
        const interval = setInterval(() => {
            setCurrentIdx((i) => (i + 1) % data.recent.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [data]);

    if (!data) return null;

    // STEP_80 — Phase A 카운터 ("지금까지 N명") 영구 제거.
    //   사장 의도 = 모든 페이지에서 카운터 X / 미래 DB 5건+ 누적 후 Phase B 익명 회전만 노출.
    if (data.phase !== "live") return null;

    const item = data.recent[currentIdx % data.recent.length];
    if (!item) return null;

    const key = `live-${currentIdx}-${item.name}`;
    const content = (
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
                    bottom: 24,
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
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        style={{
                            background: "#1F2937",
                            borderRadius: 9999,
                            padding: "14px 24px",
                            fontSize: 14,
                            color: "#FFFFFF",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // STEP_84 — 박스 크기 고정 (콘텐츠만 바뀌고 박스 동일 = 통일감)
                            // 380px = 가장 긴 콘텐츠 ("이*현 님이 1분 전 1:1 비밀 상담을 신청했습니다") 안 잘림
                            width: 380,
                            maxWidth: "calc(100vw - 24px)",
                            whiteSpace: "nowrap",
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
