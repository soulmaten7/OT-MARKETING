"use client";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function GoogleDiscovery() {
    return (
        <div className="w-full h-full flex flex-col bg-white" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
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

            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }} className="flex-[3] m-2 rounded-2xl overflow-hidden border border-gray-200 shadow-md flex flex-col">
                <div className="aspect-[16/10] bg-gradient-to-br from-[#6C63FF] to-[#2D1FA3] flex items-center justify-center text-white relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-[8px] px-2 py-0.5 rounded font-bold">광고</div>
                    <ImagePlaceholder accentColor="rgba(255,255,255,0.5)" label="광고주 카드 이미지" />
                    <div className="relative z-20 text-center px-4">
                        <div className="text-[20px] font-black leading-tight">5G</div>
                        <div className="text-[10px] opacity-90 mt-1">요금 비교 안내</div>
                    </div>
                </div>
                <div className="px-3 py-3 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="text-[12px] font-bold text-gray-900 leading-tight mb-1">5G 요금 정보 안내</div>
                        <div className="text-[10px] text-gray-600 leading-snug">무약정 선택 가능</div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#2D1FA3]" />
                        <div className="text-[9px] text-gray-700 font-semibold">통신사 OO</div>
                        <div className="ml-auto flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-[9px] text-gray-700 font-semibold">4.6</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="mx-2 mb-1 rounded-xl overflow-hidden border border-gray-100 flex flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-[#EDE9FF] to-[#C4B5FD] flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">5G vs LTE 요금 비교 분석</div>
                    <div className="flex items-center gap-1 mt-0.5">
                        <div className="text-[8px] text-gray-400">TECH NEWS</div>
                        <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
                        <span className="text-[8px] text-gray-400">4.4</span>
                    </div>
                </div>
            </div>

            <div className="mx-2 mb-2 rounded-xl overflow-hidden border border-gray-100 flex flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">가족 결합 할인 요금 정리</div>
                    <div className="flex items-center gap-1 mt-0.5">
                        <div className="text-[8px] text-gray-400">통신 매거진</div>
                        <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
                        <span className="text-[8px] text-gray-400">4.5</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
