"use client";

import { Search, MapPin } from "lucide-react";

export function KarrotMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FAF7F2] text-xs">
            {/* 상단 바 */}
            <div className="flex items-center justify-between px-3 h-10 bg-white border-b border-gray-100 pt-6">
                <div className="font-extrabold text-[#FF7E36] text-base">당근</div>
                <div className="flex items-center gap-1 text-[10px] text-gray-700 font-semibold">
                    <MapPin className="w-3 h-3 text-[#FF7E36]" />
                    OO동
                </div>
                <Search className="w-4 h-4 text-gray-700" />
            </div>

            {/* 광고 카드 */}
            <div className="px-3 py-3 flex-1 flex flex-col gap-3">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm relative">
                    <div className="absolute top-2 right-2 z-10 text-[8px] bg-black/40 text-white px-1.5 py-0.5 rounded font-semibold">광고</div>
                    <div className="aspect-[4/3] bg-gradient-to-br from-[#FAF7F2] via-[#FFD9B8] to-[#FF7E36] flex items-center justify-center">
                        <div className="text-center px-3">
                            <div className="text-base font-extrabold text-[#1F1F1F] leading-tight mb-1">변제계획 검토</div>
                            <div className="text-2xl font-extrabold text-[#FF7E36] leading-tight">무료</div>
                        </div>
                    </div>
                    <div className="px-3 py-2.5">
                        <div className="text-[11px] font-bold text-[#1F1F1F] mb-1 leading-snug">회생·파산 법률상담 — 법무법인 OO</div>
                        <div className="text-[9px] text-gray-500 mb-1.5">OO동 비즈프로필</div>
                        <div className="text-[10px] font-bold text-[#FF7E36]">법률상담 무료</div>
                    </div>
                </div>

                {/* 흐릿한 유사 카드 */}
                <div className="bg-white rounded-xl overflow-hidden opacity-50">
                    <div className="aspect-[4/3] bg-gray-200" />
                    <div className="px-3 py-2">
                        <div className="h-2 bg-gray-200 rounded mb-1 w-3/4" />
                        <div className="h-2 bg-gray-200 rounded w-1/2" />
                    </div>
                </div>
            </div>

            {/* 하단 네비 placeholder */}
            <div className="flex items-center justify-around h-10 border-t border-gray-200 bg-white flex-shrink-0">
                <div className="w-2 h-2 bg-[#FF7E36] rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
            </div>
        </div>
    );
}
