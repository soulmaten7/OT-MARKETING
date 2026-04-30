"use client";
import { Search } from "lucide-react";

export function NaverSearchMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white text-xs overflow-hidden">
            {/* 검색바 */}
            <div className="px-2 py-2 flex-shrink-0 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                    <div className="font-extrabold text-[#03C75A] text-base leading-none">N</div>
                    <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-1.5 gap-2">
                        <span className="text-[11px] text-gray-700">개인회생</span>
                        <Search className="w-3 h-3 text-gray-500 ml-auto" />
                    </div>
                </div>
            </div>

            {/* 광고 영역 */}
            <div className="px-3 py-2 border-b border-gray-100 flex-shrink-0">
                <div className="inline-block bg-[#FF6F00] text-white text-[8px] font-bold px-1.5 py-0.5 rounded mb-1">
                    광고
                </div>
                <div className="text-[9px] text-green-600 mb-0.5">lawfirm-oo.com</div>
                <div className="text-[#1B6BF5] font-bold text-[11px] leading-tight mb-1">
                    개인회생 법률상담 무료 — 법무법인 OO
                </div>
                <div className="text-[10px] text-gray-600 leading-relaxed mb-2">
                    변제계획 검토부터 신용회복위원회 안내까지. 1분 자가진단.
                </div>
                {/* 사이트 링크 */}
                <div className="flex gap-1 flex-wrap">
                    {["상담안내", "비용", "절차", "후기"].map((link) => (
                        <span
                            key={link}
                            className="text-[9px] text-[#1B6BF5] border border-[#1B6BF5]/30 rounded px-1.5 py-0.5"
                        >
                            {link}
                        </span>
                    ))}
                </div>
            </div>

            {/* 유기 검색 결과 (흐릿) */}
            <div className="flex-1 px-3 py-2 space-y-3 opacity-35">
                {[
                    { title: "개인회생 신청 자격 조건 총정리", url: "blog.naver.com" },
                    { title: "개인회생 vs 파산 차이점", url: "lawinfo.co.kr" },
                    { title: "개인회생 절차 기간 얼마나?", url: "court.go.kr" },
                ].map((item, i) => (
                    <div key={i}>
                        <div className="text-[9px] text-green-600">{item.url}</div>
                        <div className="text-[10px] text-[#1B6BF5] font-medium leading-tight">{item.title}</div>
                        <div className="h-2 bg-gray-100 rounded w-4/5 mt-1" />
                    </div>
                ))}
            </div>
        </div>
    );
}
