"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function KakaoMoment() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FEE500]">
            <div className="flex-1 flex flex-col">
                <div className="flex-[2] flex items-center justify-center px-6 relative overflow-hidden">
                    {/* house shapes */}
                    <div className="absolute bottom-4 left-4 opacity-20">
                        <svg viewBox="0 0 36 32" className="w-10 h-9" fill="none" stroke="#92400E" strokeWidth="2" strokeLinejoin="round">
                            <polygon points="18,3 4,14 8,14 8,30 28,30 28,14 32,14" />
                        </svg>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-15">
                        <svg viewBox="0 0 28 24" className="w-7 h-6" fill="none" stroke="#92400E" strokeWidth="2" strokeLinejoin="round">
                            <polygon points="14,2 3,11 6,11 6,22 22,22 22,11 25,11" />
                        </svg>
                    </div>
                    <div className="absolute top-3 right-3 bg-[#3C1E1E]/20 text-[#3C1E1E] text-[9px] px-2 py-0.5 rounded font-bold">광고</div>
                    <ImagePlaceholder accentColor="rgba(60,30,30,0.4)" label="광고주 카드 이미지" />
                    <div className="relative z-20 text-center text-[#3C1E1E]">
                        <div className="text-[11px] font-bold tracking-widest mb-3 opacity-70">부동산 매물 정보</div>
                        <div className="text-[24px] font-bold leading-tight mb-3">
                            매물 정보 안내
                        </div>
                        <div className="text-[12px] opacity-80">
                            시세 분석 · 등록 중개사
                        </div>
                    </div>
                </div>
                <div className="bg-[#92400E] text-white px-5 py-4">
                    <div className="text-[12px] font-bold mb-1">공인중개사 OO</div>
                    <div className="text-[10px] opacity-80 mb-3 leading-relaxed">
                        지역 시세 분석, 매물 비교. 자격 등록번호 OO###.
                    </div>
                    <button className="w-full bg-[#FEE500] text-[#3C1E1E] font-bold py-2 rounded text-[11px]">
                        매물 보기
                    </button>
                </div>
            </div>
        </div>
    );
}
