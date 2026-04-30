"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function NaverSearch() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-[#03C75A]">
                <div className="w-5 h-5 bg-[#03C75A] text-white font-bold text-[10px] flex items-center justify-center rounded">N</div>
                <div className="flex-1 text-[12px] text-[#1F1F1F] font-bold">5G 요금제 비교</div>
                <div className="text-[#03C75A] text-[10px]">🔍</div>
            </div>

            <div className="flex-1 px-3 py-3 bg-gradient-to-b from-[#F5F3FF] to-white relative">
                <ImagePlaceholder accentColor="rgba(3,199,90,0.4)" label="광고주 로고/이미지" size="sm" />
                <div className="relative z-20">
                <div className="inline-block bg-[#FF6F00] text-white text-[9px] font-bold px-2 py-0.5 rounded mb-2">광고</div>
                <div className="text-[10px] text-[#03C75A] font-bold mb-1">telecom-oo.com</div>
                <div className="text-[15px] font-bold text-[#1F1F1F] leading-snug mb-2">
                    인터넷 요금 비교 안내
                </div>
                <div className="text-[10px] text-gray-600 leading-relaxed mb-3">
                    약정·무약정 조건 정리
                </div>
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                    {["요금 안내", "결합 할인", "가족 요금", "데이터 비교"].map((s) => (
                        <div key={s} className="text-[9px] text-[#03C75A] border border-[#03C75A]/30 px-2 py-1 rounded text-center">{s}</div>
                    ))}
                </div>
                <div className="bg-[#F0EEFF] border-l-4 border-[#6C63FF] px-3 py-2 rounded-r">
                    <div className="text-[10px] font-bold text-[#1F1F1F]">📶 5G 데이터 무제한 · 약정 조건 명시</div>
                </div>
                </div>
            </div>

            <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
                <div className="text-[9px] text-gray-400 font-bold mb-1">관련 검색</div>
                <div className="text-[10px] text-gray-600">5G 요금 비교 / 무약정 요금제 / 가족 결합 할인</div>
            </div>
        </div>
    );
}
