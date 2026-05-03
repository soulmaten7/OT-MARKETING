"use client";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function GoogleDiscoveryMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
            {/* 헤더 — 4컬러 G 로고 */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 flex-shrink-0">
                <div className="flex gap-0.5 items-baseline">
                    <span className="text-[#4285F4] font-bold text-[15px]">G</span>
                    <span className="text-[#EA4335] font-bold text-[15px]">o</span>
                    <span className="text-[#FBBC05] font-bold text-[15px]">o</span>
                    <span className="text-[#4285F4] font-bold text-[15px]">g</span>
                    <span className="text-[#34A853] font-bold text-[15px]">l</span>
                    <span className="text-[#EA4335] font-bold text-[15px]">e</span>
                </div>
                <div className="text-[10px] text-gray-500 font-medium">디스커버</div>
            </div>

            {/* 메인 광고 카드 */}
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }} className="flex-[3] m-2 mb-1 rounded-2xl overflow-hidden border border-gray-200 shadow-md flex flex-col">
                {/* 이미지 */}
                <div className="aspect-[16/10] flex items-center justify-center text-white relative overflow-hidden">
                    <Image
                        src="/ads-creatives/01-debt-relief/DR-019-A.png"
                        alt="가상 결정문 변형 - 회생 결과"
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/55 z-10" />
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-[8px] px-2 py-0.5 rounded font-bold z-20">광고</div>
                    <div className="relative z-20 text-center px-4 drop-shadow-lg">
                        <div className="text-[16px] font-bold leading-tight">법률상담 무료</div>
                        <div className="text-[10px] opacity-95 mt-1">회생·파산 검토</div>
                    </div>
                </div>
                {/* 정보 */}
                <div className="px-3 py-3 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="text-[12px] font-bold text-gray-900 leading-tight mb-1">
                            법률상담 무료 안내
                        </div>
                        <div className="text-[10px] text-gray-600 leading-snug">
                            회생·파산 검토
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--navy)] to-[var(--coral-500)]" />
                        <div className="text-[9px] text-gray-700 font-semibold">법무법인 OO</div>
                        <div className="ml-auto flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-[9px] text-gray-700 font-semibold">4.8</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 유기 카드 */}
            <div className="mx-2 mb-1 rounded-xl overflow-hidden border border-gray-100 flex flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">
                        가계부채 1,800조, 회생·파산 신청 급증
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                        <div className="text-[8px] text-gray-400">DAILY NEWS</div>
                        <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
                        <span className="text-[8px] text-gray-400">4.6</span>
                    </div>
                </div>
            </div>

            <div className="mx-2 mb-2 rounded-xl overflow-hidden border border-gray-100 flex flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">
                        개인회생 절차, 신청 자격 정리
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                        <div className="text-[8px] text-gray-400">법률 정보</div>
                        <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
                        <span className="text-[8px] text-gray-400">4.7</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
