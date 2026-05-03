"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function KakaoMomentMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FEE500]" style={{ fontFamily: 'Pretendard, system-ui, sans-serif' }}>
            {/* 카카오 톱 */}
            <div className="flex items-center justify-between px-3 py-2 flex-shrink-0">
                <div className="text-[#3C1E1E] font-black text-[12px] tracking-tight">kakao</div>
                <div className="text-[10px] text-[#3C1E1E]/60 font-medium">추천 콘텐츠</div>
            </div>

            {/* 광고 카드 */}
            <div className="px-3 flex-1 flex flex-col">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }} className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col flex-1">
                    {/* 이미지 영역 — STEP_50: DR-018(1:1) → DR-021(9:16) swap, 양옆 짤림 해결 */}
                    <div className="flex-[3] flex items-center justify-center relative overflow-hidden bg-[var(--navy)]">
                        <Image
                            src="/ads-creatives/01-debt-relief/DR-021-A.png"
                            alt="9:16 세로 채무 구제 안내 - 카카오 모먼트 적합 비율"
                            fill
                            sizes="(max-width: 768px) 50vw, 260px"
                            className="object-cover z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30 z-10" />
                        <div className="absolute top-3 right-3 bg-[#3C1E1E]/30 text-white text-[9px] px-2 py-0.5 rounded font-bold z-20">광고</div>
                        <div className="relative z-20 text-center text-white px-4 drop-shadow-lg">
                            <div className="text-[10px] font-bold tracking-widest mb-2 opacity-90">채무 독촉 해결</div>
                            <div className="text-[20px] font-extrabold leading-tight mb-2">
                                변제계획 검토 무료
                            </div>
                            <div className="text-[11px] opacity-95">
                                자가진단 1분
                            </div>
                        </div>
                    </div>

                    {/* CTA 영역 */}
                    <div className="bg-[#3C1E1E] text-white px-4 py-3 flex-shrink-0">
                        <div className="text-[11px] font-bold mb-1">법무법인 OO</div>
                        <div className="text-[10px] opacity-80 mb-2 leading-relaxed">
                            본인 회생 가능 여부 무료 확인.
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-[#FEE500] text-[#3C1E1E] font-bold py-1.5 rounded-full text-[10px]">
                            자세히 보기
                        </motion.button>
                    </div>
                </motion.div>

                {/* 인디케이터 5점 */}
                <div className="flex items-center justify-center gap-1 mt-3 mb-2 flex-shrink-0">
                    <div className="w-6 h-1.5 bg-[#3C1E1E] rounded-full" />
                    <div className="w-1.5 h-1.5 bg-[#3C1E1E]/30 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-[#3C1E1E]/30 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-[#3C1E1E]/30 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-[#3C1E1E]/30 rounded-full" />
                </div>
            </div>
        </div>
    );
}
