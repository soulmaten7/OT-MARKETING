"use client";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function KakaoMoment() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FEE500]" style={{ fontFamily: 'Pretendard, system-ui, sans-serif' }}>
            <div className="flex items-center justify-between px-3 py-2 flex-shrink-0">
                <div className="text-[#3C1E1E] font-black text-[12px] tracking-tight">kakao</div>
                <div className="text-[10px] text-[#3C1E1E]/60 font-medium">추천 콘텐츠</div>
            </div>

            <div className="px-3 flex-1 flex flex-col">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }} className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col flex-1">
                    <div className="flex-[3] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#FEE500] to-[#FFD90A]">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-28 h-28 border-2 border-[#0099CC]/30 rounded-full" />
                            <div className="absolute w-20 h-20 border-2 border-[#0099CC]/40 rounded-full" />
                        </div>
                        <div className="absolute top-3 right-3 bg-[#3C1E1E]/20 text-[#3C1E1E] text-[9px] px-2 py-0.5 rounded font-bold">광고</div>
                        <ImagePlaceholder accentColor="rgba(60,30,30,0.4)" label="광고주 카드 이미지" />
                        <div className="relative z-20 text-center text-[#3C1E1E] px-4">
                            <div className="text-[10px] font-bold tracking-widest mb-2 opacity-70">정수기 렌탈 무이자</div>
                            <div className="text-[20px] font-extrabold leading-tight mb-2">
                                무이자 36개월 렌탈
                            </div>
                            <div className="text-[11px] opacity-80">
                                월 요금 · 총액 명시
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0077B6] text-white px-4 py-3 flex-shrink-0">
                        <div className="text-[11px] font-bold mb-1">정수기 브랜드 OO</div>
                        <div className="text-[10px] opacity-80 mb-2 leading-relaxed">
                            무이자 36개월 · 월 요금 · 총액 명시 의무.
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-[#FEE500] text-[#3C1E1E] font-bold py-1.5 rounded-full text-[10px]">
                            비교 보기
                        </motion.button>
                    </div>
                </motion.div>

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
