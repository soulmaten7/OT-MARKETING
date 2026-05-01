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
                        <div className="absolute bottom-4 left-4 opacity-20">
                            <svg viewBox="0 0 36 32" className="w-10 h-9" fill="none" stroke="#92400E" strokeWidth="2" strokeLinejoin="round">
                                <polygon points="18,3 4,14 8,14 8,30 28,30 28,14 32,14" />
                            </svg>
                        </div>
                        <div className="absolute bottom-4 right-4 opacity-15">
                            <svg viewBox="0 0 28 24" className="w-7 h-6" fill="none" stroke="#92400E" strokeWidth="2" strokeLinejoin="round">
                                <polygon points="14,2 3,11 6,11 6,22 22,22 22,11 25,11" />
                            </svg>
                        </div>
                        <div className="absolute top-3 right-3 bg-[#3C1E1E]/20 text-[#3C1E1E] text-[9px] px-2 py-0.5 rounded font-bold">광고</div>
                        <ImagePlaceholder accentColor="rgba(60,30,30,0.4)" label="광고주 카드 이미지" />
                        <div className="relative z-20 text-center text-[#3C1E1E] px-4">
                            <div className="text-[10px] font-bold tracking-widest mb-2 opacity-70">부동산 매물 정보</div>
                            <div className="text-[20px] font-extrabold leading-tight mb-2">
                                매물 정보 안내
                            </div>
                            <div className="text-[11px] opacity-80">
                                시세 분석 · 등록 중개사
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#92400E] text-white px-4 py-3 flex-shrink-0">
                        <div className="text-[11px] font-bold mb-1">공인중개사 OO</div>
                        <div className="text-[10px] opacity-80 mb-2 leading-relaxed">
                            지역 시세 분석, 매물 비교. 자격 등록번호 OO###.
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-[#FEE500] text-[#3C1E1E] font-bold py-1.5 rounded-full text-[10px]">
                            매물 보기
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
