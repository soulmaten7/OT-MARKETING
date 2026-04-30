"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function NaverSearchMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* 압축된 검색바 (chrome 최소) */}
            <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-[#03C75A]">
                <div className="w-5 h-5 bg-[#03C75A] text-white font-bold text-[10px] flex items-center justify-center rounded">
                    N
                </div>
                <div className="flex-1 text-[12px] text-[#1F1F1F] font-bold">개인회생</div>
                <div className="text-[#03C75A] text-[10px]">🔍</div>
            </div>

            {/* 광고 영역 — 풀스크린, 폰의 65% */}
            <div className="flex-1 px-3 py-3 bg-gradient-to-b from-[#FFF8F0] to-white relative">
                <ImagePlaceholder accentColor="rgba(3,199,90,0.4)" label="광고주 로고/이미지" size="sm" />
                <div className="relative z-20">
                <div className="inline-block bg-[#FF6F00] text-white text-[9px] font-bold px-2 py-0.5 rounded mb-2">
                    광고
                </div>
                <div className="text-[10px] text-[#03C75A] font-bold mb-1">lawfirm-oo.com</div>
                <div className="text-[15px] font-bold text-[#1F1F1F] leading-snug mb-2">
                    개인회생 자격 안내
                </div>
                <div className="text-[10px] text-gray-600 leading-relaxed mb-3">
                    1분 자가진단
                </div>
                {/* 사이트링크 */}
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                    {["상담 안내", "절차·비용", "변제 사례", "1분 자가진단"].map((s) => (
                        <div key={s} className="text-[9px] text-[#03C75A] border border-[#03C75A]/30 px-2 py-1 rounded text-center">
                            {s}
                        </div>
                    ))}
                </div>
                {/* 강조 박스 */}
                <div className="bg-[#FFF0E0] border-l-4 border-[#FF6F00] px-3 py-2 rounded-r">
                    <div className="text-[10px] font-bold text-[#1F1F1F]">📞 법률상담 무료 · 평일 9~18시</div>
                </div>
                </div>
            </div>

            {/* 유기 결과 (작게) — 컨텍스트만 */}
            <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
                <div className="text-[9px] text-gray-400 font-bold mb-1">관련 검색</div>
                <div className="text-[10px] text-gray-600">개인회생 신청 자격 / 변제 기간 / 파산 차이</div>
            </div>
        </div>
    );
}
