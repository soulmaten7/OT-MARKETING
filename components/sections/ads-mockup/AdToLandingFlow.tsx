"use client";

import { motion } from "framer-motion";

function MiniPhone({ children, label }: { children: React.ReactNode; label: string }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="text-[10px] font-bold text-[var(--navy)] bg-[var(--navy)]/10 px-2 py-0.5 rounded-full">
                {label}
            </div>
            <div className="relative w-[130px] md:w-[150px] aspect-[9/19.5] bg-gray-900 rounded-[2rem] p-1.5 shadow-lg">
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-black rounded-full z-10" />
                <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}

function AdMini() {
    return (
        <div className="w-full h-full flex flex-col bg-white text-[8px]">
            <div className="px-2 h-7 flex items-center border-b border-gray-100 flex-shrink-0">
                <span className="font-bold text-[#1877F2] text-[9px]">facebook</span>
            </div>
            <div className="flex-1 bg-gradient-to-br from-[var(--coral-500)] to-[var(--navy)] flex items-center justify-center text-white">
                <div className="text-center">
                    <div className="font-bold text-[9px]">변제계획 검토</div>
                    <div className="font-bold text-[10px]">무료 안내</div>
                </div>
            </div>
            <div className="px-2 pb-1.5 flex-shrink-0 mt-1">
                <div className="w-full bg-[#1877F2] text-white font-bold py-1 rounded text-center text-[8px]">
                    더 알아보기
                </div>
            </div>
        </div>
    );
}

function LandingMini() {
    return (
        <div className="w-full h-full flex flex-col bg-[#0F1E3D] text-white text-[8px]">
            <div className="px-2 py-2 flex-shrink-0">
                <div className="inline-block bg-[#C5A572] text-[#0F1E3D] font-bold text-[7px] px-1.5 py-0.5 rounded-full mb-2">
                    ⚖ 개인회생·법률
                </div>
                <div className="font-bold text-[9px] leading-tight mb-2">
                    회생·파산 법률 안내<br />변제계획 검토 무료
                </div>
                <div className="text-[7px] text-white/70 mb-3 leading-relaxed">
                    1분 자가진단으로 개인회생<br />가능 여부 먼저 확인하세요.
                </div>
                {/* 진행 바 */}
                <div className="h-0.5 bg-white/20 rounded-full mb-3">
                    <div className="h-full w-1/4 bg-[#C5A572] rounded-full" />
                </div>
                {/* 선택지 */}
                <div className="space-y-1">
                    {["1천만원 미만", "1천~3천만원"].map((v) => (
                        <div key={v} className="border border-white/20 rounded px-1.5 py-1 text-[7px] text-white/80">
                            {v}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function AdToLandingFlow() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 max-w-3xl mx-auto">
            {/* 광고 폰 */}
            <MiniPhone label="광고 (Meta 피드)">
                <AdMini />
            </MiniPhone>

            {/* 화살표 + 캡션 */}
            <div className="flex flex-col items-center gap-3">
                {/* PC: 가로 화살표 / 모바일: 세로 */}
                <div className="hidden md:block w-32">
                    <motion.svg viewBox="0 0 120 24" className="w-full" fill="none">
                        <motion.line
                            x1="0" y1="12" x2="100" y2="12"
                            stroke="var(--coral-500)"
                            strokeWidth="2"
                            strokeDasharray="6 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.polyline
                            points="96,6 108,12 96,18"
                            stroke="var(--coral-500)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.3, repeat: Infinity, repeatDelay: 1.2 }}
                        />
                    </motion.svg>
                </div>
                <div className="block md:hidden h-12">
                    <motion.svg viewBox="0 0 24 60" className="h-full" fill="none">
                        <motion.line
                            x1="12" y1="0" x2="12" y2="48"
                            stroke="var(--coral-500)"
                            strokeWidth="2"
                            strokeDasharray="6 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.polyline
                            points="6,44 12,56 18,44"
                            stroke="var(--coral-500)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.3, repeat: Infinity, repeatDelay: 1.2 }}
                        />
                    </motion.svg>
                </div>
                <div className="text-[10px] text-[var(--coral-500)] font-bold text-center">
                    광고 클릭 → 0.3초
                </div>
            </div>

            {/* 랜딩 폰 */}
            <MiniPhone label="랜딩 (otpage1.com)">
                <LandingMini />
            </MiniPhone>

            {/* 캡션 */}
            <div className="hidden md:block md:absolute md:bottom-0 md:left-0 md:right-0" />
        </div>
    );
}
