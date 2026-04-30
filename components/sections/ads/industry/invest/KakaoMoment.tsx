"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function KakaoMoment() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FEE500]">
            <div className="flex-1 flex flex-col">
                <div className="flex-[2] flex items-center justify-center px-6 relative overflow-hidden">
                    {/* chart arrow */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-15">
                        <svg viewBox="0 0 80 50" className="w-24 h-16" fill="none">
                            <polyline points="5,45 25,30 40,36 65,12" stroke="#1E3A5F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="60,10 68,12 65,20" stroke="#1E3A5F" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="absolute top-3 right-3 bg-[#3C1E1E]/20 text-[#3C1E1E] text-[9px] px-2 py-0.5 rounded font-bold">광고</div>
                    <ImagePlaceholder accentColor="rgba(60,30,30,0.4)" label="광고주 카드 이미지" />
                    <div className="relative z-20 text-center text-[#3C1E1E]">
                        <div className="text-[11px] font-bold tracking-widest mb-3 opacity-70">주식 투자 정보</div>
                        <div className="text-[24px] font-bold leading-tight mb-3">
                            시장 분석 안내
                        </div>
                        <div className="text-[12px] opacity-80">
                            종목 정보 · 시황
                        </div>
                    </div>
                </div>
                <div className="bg-[#1E3A5F] text-white px-5 py-4">
                    <div className="text-[12px] font-bold mb-1">투자 정보 OO</div>
                    <div className="text-[10px] opacity-80 mb-3 leading-relaxed">
                        차트 분석, 산업 동향 정보. 정보 중심.
                    </div>
                    <button className="w-full bg-[#FEE500] text-[#3C1E1E] font-bold py-2 rounded text-[11px]">
                        정보 보기
                    </button>
                </div>
            </div>
        </div>
    );
}
