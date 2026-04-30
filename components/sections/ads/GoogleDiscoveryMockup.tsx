"use client";

import { Search } from "lucide-react";

export function GoogleDiscoveryMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white text-xs">
            {/* 상단 — Google 로고 + 검색바 */}
            <div className="flex flex-col items-center px-3 pt-8 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-px text-base font-medium leading-none mb-2">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                </div>
                <div className="w-full flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                    <Search className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] text-gray-400">Search</span>
                </div>
            </div>

            {/* Discovery 카드들 */}
            <div className="flex-1 px-3 py-3 space-y-3 overflow-hidden">
                {/* 광고 카드 */}
                <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
                    <div className="aspect-[16/9] bg-gradient-to-br from-[var(--coral-500)] to-[var(--navy)] flex items-center justify-center">
                        <div className="text-center text-white px-3">
                            <div className="text-sm font-bold mb-0.5 leading-tight">법률상담 무료</div>
                            <div className="text-[10px] opacity-90">회생·파산 검토</div>
                        </div>
                    </div>
                    <div className="px-2.5 py-2">
                        <div className="text-[10px] font-bold text-[var(--navy)] leading-tight mb-1">
                            법률상담 무료 — 회생·파산 검토
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[8px] text-gray-500 truncate">법무법인 OO</span>
                            <span className="text-[7px] bg-gray-100 text-gray-500 px-1 py-px rounded font-semibold">광고</span>
                        </div>
                    </div>
                </div>

                {/* 유기 카드 (흐릿) */}
                <div className="rounded-lg overflow-hidden border border-gray-100 opacity-50">
                    <div className="aspect-[16/9] bg-gray-200" />
                    <div className="px-2.5 py-2">
                        <div className="h-2 bg-gray-200 rounded mb-1 w-full" />
                        <div className="h-1.5 bg-gray-200 rounded w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
