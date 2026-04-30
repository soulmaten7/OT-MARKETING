"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function KakaoMoment() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FEE500]">
            <div className="flex-1 flex flex-col">
                <div className="flex-[2] flex items-center justify-center px-6 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 border-2 border-[#6C63FF]/30 rounded-full" />
                        <div className="absolute w-16 h-16 border-2 border-[#6C63FF]/40 rounded-full" />
                        <div className="absolute w-8 h-8 bg-[#6C63FF]/20 rounded-full" />
                    </div>
                    <div className="absolute top-3 right-3 bg-[#3C1E1E]/20 text-[#3C1E1E] text-[9px] px-2 py-0.5 rounded font-bold">광고</div>
                    <ImagePlaceholder accentColor="rgba(60,30,30,0.4)" label="광고주 카드 이미지" />
                    <div className="relative z-20 text-center text-[#3C1E1E]">
                        <div className="text-[11px] font-bold tracking-widest mb-3 opacity-70">통신비 절약</div>
                        <div className="text-[24px] font-bold leading-tight mb-3">
                            5G 요금 안내
                        </div>
                        <div className="text-[12px] opacity-80">
                            무약정 · 데이터 무제한
                        </div>
                    </div>
                </div>
                <div className="bg-[#2D1FA3] text-white px-5 py-4">
                    <div className="text-[12px] font-bold mb-1">통신사 OO</div>
                    <div className="text-[10px] opacity-80 mb-3 leading-relaxed">
                        5G 요금 비교 · 가입비 X · 약정 자유 선택.
                    </div>
                    <button className="w-full bg-[#FEE500] text-[#3C1E1E] font-bold py-2 rounded text-[11px]">
                        요금 비교
                    </button>
                </div>
            </div>
        </div>
    );
}
