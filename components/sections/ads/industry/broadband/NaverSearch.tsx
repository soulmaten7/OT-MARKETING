"use client";
import { Mic, Menu } from "lucide-react";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function NaverSearch() {
    return (
        <div className="w-full h-full flex flex-col bg-white" style={{ fontFamily: 'Pretendard, system-ui, "Apple SD Gothic Neo", sans-serif' }}>
            <div className="flex items-center gap-2 px-3 py-2 bg-white border-b border-gray-200">
                <div className="w-7 h-7 bg-[#03C75A] text-white font-black text-[12px] flex items-center justify-center rounded">N</div>
                <div className="flex-1 flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                    <span className="text-[12px] text-[#1F1F1F] font-semibold flex-1">인터넷 요금제</span>
                    <Mic className="w-3.5 h-3.5 text-[#03C75A]" />
                </div>
                <Menu className="w-4 h-4 text-gray-700" />
            </div>

            <div className="flex items-center gap-3 px-3 py-1.5 border-b border-gray-100 overflow-x-auto flex-shrink-0">
                <span className="text-[11px] font-bold text-[#03C75A] border-b-2 border-[#03C75A] pb-1">VIEW</span>
                <span className="text-[11px] text-gray-600">통합</span>
                <span className="text-[11px] text-gray-600">이미지</span>
                <span className="text-[11px] text-gray-600">지식iN</span>
                <span className="text-[11px] text-gray-600">동영상</span>
            </div>

            <div className="flex-1 px-3 py-3 bg-gradient-to-b from-[#F5F3FF] to-white relative">
                <ImagePlaceholder accentColor="rgba(3,199,90,0.4)" label="광고주 로고/이미지" size="sm" />
                <div className="relative z-20">
                    <div className="inline-block bg-[#FF6F00] text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2">광고</div>
                    <div className="text-[10px] text-[#03C75A] font-semibold mb-1">telecom-oo.com</div>
                    <div className="text-[15px] font-bold text-[#1F1F1F] leading-snug mb-2">
                        인터넷 요금 비교 안내
                    </div>
                    <div className="text-[10px] text-gray-700 leading-relaxed mb-3">
                        약정·무약정 조건 정리
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 mb-3">
                        {["요금 안내", "결합 할인", "가족 요금", "데이터 비교"].map((s) => (
                            <div key={s} className="text-[10px] text-[#03C75A] border border-[#03C75A]/30 px-2 py-1 rounded text-center">{s}</div>
                        ))}
                    </div>
                    <div className="bg-[#F0EEFF] border-l-4 border-[#6C63FF] px-3 py-2 rounded-r mb-3">
                        <div className="text-[10px] font-bold text-[#1F1F1F]">📶 5G 데이터 무제한 · 약정 조건 명시</div>
                    </div>
                </div>
            </div>

            <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                <div className="text-[9px] text-gray-400 font-bold mb-1">관련 검색</div>
                <div className="text-[10px] text-gray-600">5G 요금 비교 / 무약정 요금제 / 가족 결합 할인</div>
            </div>
        </div>
    );
}
