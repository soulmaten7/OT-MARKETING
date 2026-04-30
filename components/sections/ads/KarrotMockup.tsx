"use client";
import { Search } from "lucide-react";

export function KarrotMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FAF7F2] text-xs">
            {/* 상단 바 */}
            <div className="flex items-center justify-between px-3 h-10 bg-white border-b border-gray-100 flex-shrink-0">
                <div className="font-bold text-[#FF7E36] text-sm">당근</div>
                <div className="text-[11px] text-gray-600 font-medium">OO동</div>
                <Search className="w-4 h-4 text-gray-600" />
            </div>

            {/* 광고 카드 메인 */}
            <div className="mx-2 mt-3 bg-white rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                {/* 이미지 */}
                <div className="relative">
                    <div
                        className="w-full aspect-[4/3] flex items-center justify-center text-white font-bold"
                        style={{ background: "linear-gradient(135deg, #FAF7F2 0%, #FF7E36 100%)" }}
                    >
                        <div className="text-center">
                            <div className="text-[#1F1F1F] text-sm font-bold">변제계획 검토</div>
                            <div className="text-[#FF7E36] text-base font-extrabold">무료</div>
                        </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-white/80 text-gray-500 text-[9px] px-1.5 py-0.5 rounded">
                        광고
                    </div>
                </div>
                {/* 정보 */}
                <div className="px-3 py-2">
                    <div className="font-bold text-[12px] text-[#1F1F1F] leading-tight">
                        회생·파산 법률상담 — 법무법인 OO
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5">OO동 비즈프로필</div>
                    <div className="text-[11px] font-bold text-[#FF7E36] mt-1">법률상담 무료</div>
                </div>
            </div>

            {/* 유사 카드 2개 (흐릿) */}
            <div className="mx-2 mt-2 space-y-2 flex-1 overflow-hidden opacity-40">
                {[0, 1].map((i) => (
                    <div key={i} className="bg-white rounded-xl flex gap-2 p-2 shadow-sm">
                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0" />
                        <div className="flex-1 space-y-1.5 py-1">
                            <div className="h-2.5 bg-gray-200 rounded w-3/4" />
                            <div className="h-2 bg-gray-100 rounded w-1/2" />
                            <div className="h-2 bg-gray-100 rounded w-1/3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
