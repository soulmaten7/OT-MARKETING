"use client";
import { Search } from "lucide-react";

export function GoogleDiscoveryMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white text-xs overflow-hidden">
            {/* Google 상단 */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 flex-shrink-0">
                <div className="font-bold text-sm">
                    <span style={{ color: "#4285F4" }}>G</span>
                    <span style={{ color: "#EA4335" }}>o</span>
                    <span style={{ color: "#FBBC05" }}>o</span>
                    <span style={{ color: "#4285F4" }}>g</span>
                    <span style={{ color: "#34A853" }}>l</span>
                    <span style={{ color: "#EA4335" }}>e</span>
                </div>
                <div className="flex-1 flex items-center bg-gray-100 rounded-full px-2 py-1 gap-1">
                    <Search className="w-3 h-3 text-gray-400" />
                    <div className="h-2 bg-gray-300 rounded w-16" />
                </div>
            </div>

            {/* 광고 카드 (첫 번째) */}
            <div className="mx-2 mt-3 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                {/* 큰 이미지 */}
                <div className="w-full h-28 bg-gradient-to-br from-[var(--coral-500)] to-[var(--navy)] flex items-center justify-center text-white">
                    <div className="text-center px-4">
                        <div className="text-sm font-bold">법률상담 무료</div>
                        <div className="text-xs opacity-80">회생·파산 검토</div>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <div className="text-[11px] font-bold text-[var(--navy)] leading-tight mb-0.5">
                        법률상담 무료 — 회생·파산 검토
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-[9px] text-gray-500">법무법인 OO</span>
                        <span className="text-[8px] bg-gray-100 text-gray-500 px-1 rounded">광고</span>
                    </div>
                </div>
            </div>

            {/* 유기 카드 (흐릿) */}
            <div className="mx-2 mt-2 flex-1 opacity-30">
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="h-16 bg-gray-100" />
                    <div className="px-3 py-2 space-y-1">
                        <div className="h-2.5 bg-gray-200 rounded w-4/5" />
                        <div className="h-2 bg-gray-100 rounded w-3/5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
