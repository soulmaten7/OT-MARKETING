"use client";

import { motion } from "framer-motion";
import { MetaFeedMockup } from "./MetaFeedMockup";

function MiniLanding() {
    return (
        <div className="w-full h-full flex flex-col bg-white text-xs">
            {/* 상단 navy bar */}
            <div className="bg-[var(--navy)] text-white px-3 pt-7 pb-3">
                <div className="text-[8px] font-bold text-[var(--coral-400)] mb-1.5 tracking-widest">개인회생 · 법률 CPA</div>
                <div className="text-base font-extrabold leading-tight mb-1">월 변제금</div>
                <div className="text-base font-extrabold leading-tight text-[var(--coral-400)] mb-2">부담되시나요?</div>
                <p className="text-[9px] text-white/80 leading-relaxed">
                    1분 자가진단으로<br />변제계획 검토 무료
                </p>
            </div>

            {/* 자가진단 시작 섹션 */}
            <div className="flex-1 px-3 py-3 bg-gray-50">
                <div className="text-[9px] font-bold text-gray-500 mb-2">단계 1 / 4</div>
                <div className="h-1 bg-gray-200 rounded mb-3 overflow-hidden">
                    <div className="h-full w-1/4 bg-[var(--coral-500)]" />
                </div>
                <div className="text-[11px] font-bold text-[var(--navy)] mb-3 leading-snug">
                    Q. 현재 총 채무 금액이<br />어느 정도인가요?
                </div>
                <div className="space-y-2">
                    {["1천만 원 미만", "1천 ~ 3천만 원", "3천만 원 ~ 1억"].map((opt) => (
                        <div key={opt} className="bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[10px] text-gray-700 font-semibold">
                            {opt}
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="px-3 py-2 bg-white border-t border-gray-100">
                <button className="w-full bg-[var(--coral-500)] text-white font-bold py-2 rounded text-[11px]">
                    무료 진단 시작
                </button>
            </div>
        </div>
    );
}

export function AdToLandingFlow() {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
                {/* 왼쪽 — 광고 */}
                <div className="flex flex-col items-center">
                    <div className="text-[10px] tracking-widest font-bold text-[var(--coral-500)] mb-3">AD</div>
                    <div className="relative w-[220px] aspect-[9/19.5] bg-gray-900 rounded-[2rem] p-1.5 shadow-xl">
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-10" />
                        <div className="w-full h-full bg-white rounded-[1.6rem] overflow-hidden">
                            <MetaFeedMockup />
                        </div>
                    </div>
                </div>

                {/* 화살표 — PC: 가로, 모바일: 세로 */}
                <div className="flex items-center justify-center my-2 lg:my-0">
                    {/* PC 가로 화살표 */}
                    <svg className="hidden lg:block" width="120" height="40" viewBox="0 0 120 40">
                        <motion.path
                            d="M 5 20 L 105 20"
                            stroke="var(--coral-500)"
                            strokeWidth="2.5"
                            strokeDasharray="6 4"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        <path d="M 100 12 L 115 20 L 100 28 Z" fill="var(--coral-500)" />
                    </svg>
                    {/* 모바일 세로 화살표 */}
                    <svg className="lg:hidden" width="40" height="80" viewBox="0 0 40 80">
                        <motion.path
                            d="M 20 5 L 20 65"
                            stroke="var(--coral-500)"
                            strokeWidth="2.5"
                            strokeDasharray="6 4"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        <path d="M 12 60 L 20 75 L 28 60 Z" fill="var(--coral-500)" />
                    </svg>
                </div>

                {/* 오른쪽 — 랜딩 */}
                <div className="flex flex-col items-center">
                    <div className="text-[10px] tracking-widest font-bold text-[var(--coral-500)] mb-3">LANDING</div>
                    <div className="relative w-[220px] aspect-[9/19.5] bg-gray-900 rounded-[2rem] p-1.5 shadow-xl">
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-10" />
                        <div className="w-full h-full bg-white rounded-[1.6rem] overflow-hidden">
                            <MiniLanding />
                        </div>
                    </div>
                </div>
            </div>

            {/* 캡션 */}
            <p className="text-center text-sm md:text-base text-[var(--slate-600)] mt-10 leading-relaxed max-w-2xl mx-auto">
                광고 클릭 → <span className="font-bold text-[var(--coral-500)]">0.3초</span> → 랜딩 도착<br className="md:hidden" />
                <span className="md:ml-2">광고와 랜딩이 한 몸으로 굴러갑니다.</span>
            </p>
        </div>
    );
}
