"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function KakaoMoment() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FEE500]">
            <div className="flex-1 flex flex-col">
                <div className="flex-[2] flex items-center justify-center px-6 relative overflow-hidden">
                    {/* soft circles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-[#0891B2]/10 rounded-full" />
                        <div className="absolute w-16 h-16 bg-[#0891B2]/15 rounded-full" />
                    </div>
                    {/* cross */}
                    <div className="absolute top-4 right-5 opacity-20">
                        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#0891B2">
                            <rect x="9" y="2" width="6" height="20" rx="1.5" />
                            <rect x="2" y="9" width="20" height="6" rx="1.5" />
                        </svg>
                    </div>
                    <div className="absolute top-3 right-3 bg-[#3C1E1E]/20 text-[#3C1E1E] text-[9px] px-2 py-0.5 rounded font-bold">광고</div>
                    <ImagePlaceholder accentColor="rgba(60,30,30,0.4)" label="광고주 카드 이미지" />
                    <div className="relative z-20 text-center text-[#3C1E1E]">
                        <div className="text-[10px] font-bold tracking-widest mb-2 opacity-70">진료 예약 안내</div>
                        <div className="text-[22px] font-bold leading-tight mb-2">
                            OO 진료<br />예약 안내
                        </div>
                        <div className="text-[11px] opacity-80">진료 시간 · 위치</div>
                    </div>
                </div>
                <div className="bg-[#0E4F6E] text-white px-5 py-4">
                    <div className="text-[12px] font-bold mb-1">OO 병원</div>
                    <div className="text-[10px] opacity-80 mb-3 leading-relaxed">
                        예약 상담 안내. 효과·치료 결과 보장 표현 없음.
                    </div>
                    <button className="w-full bg-[#FEE500] text-[#3C1E1E] font-bold py-2 rounded text-[11px]">
                        예약 안내
                    </button>
                </div>
            </div>
        </div>
    );
}
