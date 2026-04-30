"use client";

import { Search } from "lucide-react";

export function NaverSearchMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white text-xs">
            {/* 검색바 */}
            <div className="flex items-center gap-2 px-3 h-12 border-b-2 border-[#03C75A] pt-6">
                <div className="font-extrabold text-[#03C75A] text-base">N</div>
                <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-2 py-1">
                    <span className="text-[11px] font-semibold text-gray-700 truncate">개인회생</span>
                </div>
                <Search className="w-4 h-4 text-[#03C75A]" />
            </div>

            {/* 탭 placeholder */}
            <div className="flex gap-3 px-3 py-2 text-[10px] font-semibold border-b border-gray-100">
                <span className="text-[#03C75A] border-b-2 border-[#03C75A] pb-1">통합</span>
                <span className="text-gray-500">VIEW</span>
                <span className="text-gray-500">이미지</span>
                <span className="text-gray-500">지식iN</span>
            </div>

            {/* 광고 영역 */}
            <div className="px-3 py-2.5 border-b border-gray-100 flex-1">
                <div className="flex items-center gap-1 mb-1">
                    <span className="text-[8px] bg-[#FF6F00] text-white px-1 py-px rounded font-bold">광고</span>
                    <span className="text-[9px] text-gray-500">lawfirm-oo.com</span>
                </div>
                <div className="text-[12px] font-bold text-[#1A0DAB] leading-snug mb-1">
                    개인회생 법률상담 무료 — 법무법인 OO
                </div>
                <p className="text-[10px] text-gray-700 leading-relaxed mb-2">
                    변제계획 검토부터 신용회복위원회 안내까지. 1분 자가진단.
                </p>
                <div className="flex flex-wrap gap-x-2 text-[10px] text-[#1A0DAB]">
                    <span>상담안내</span>
                    <span className="text-gray-300">|</span>
                    <span>비용</span>
                    <span className="text-gray-300">|</span>
                    <span>절차</span>
                    <span className="text-gray-300">|</span>
                    <span>후기</span>
                </div>
            </div>

            {/* 흐릿한 유기 검색 결과 */}
            <div className="px-3 py-2 opacity-40 space-y-2">
                <div>
                    <div className="text-[10px] font-bold text-[#1A0DAB] mb-0.5">개인회생 절차 안내</div>
                    <div className="h-1.5 bg-gray-200 rounded mb-1 w-full" />
                    <div className="h-1.5 bg-gray-200 rounded w-2/3" />
                </div>
                <div>
                    <div className="text-[10px] font-bold text-[#1A0DAB] mb-0.5">개인회생 비용 정리</div>
                    <div className="h-1.5 bg-gray-200 rounded mb-1 w-full" />
                    <div className="h-1.5 bg-gray-200 rounded w-1/2" />
                </div>
            </div>
        </div>
    );
}
