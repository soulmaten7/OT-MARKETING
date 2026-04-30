"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function GoogleGDN() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                <div className="font-bold text-[11px] text-gray-700">FINANCE NEWS</div>
                <div className="text-[8px] text-gray-400">경제 정보</div>
            </div>

            <div className="px-3 pt-2 pb-1">
                <div className="text-[10px] font-bold text-gray-700 mb-1 leading-snug">[경제] 국내 증시 변동성 확대, 개인 투자자 공부 수요 증가</div>
                <div className="space-y-1">
                    {[100, 88, 75].map((w, i) => (
                        <div key={i} className="h-1.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
                    ))}
                </div>
            </div>

            <div className="mx-3 my-2 rounded-lg overflow-hidden border border-gray-200 shadow-md">
                <div className="bg-gradient-to-r from-[#1E3A5F] to-[#0A1628] p-4 relative">
                    <ImagePlaceholder accentColor="rgba(255,255,255,0.6)" label="광고주 배너 이미지" />
                    <div className="flex items-center gap-3 relative z-20">
                    <div className="w-12 h-12 rounded-lg bg-[#F0B429]/20 flex items-center justify-center">
                        <svg viewBox="0 0 36 24" className="w-9 h-6" fill="none">
                            <polyline points="3,21 12,14 20,17 30,6" stroke="#F0B429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex-1 text-white">
                        <div className="text-[12px] font-bold leading-tight mb-1">시장 분석 정보</div>
                        <div className="text-[9px] opacity-90">차트 분석 · 시황 안내</div>
                    </div>
                    <button className="bg-[#F0B429] text-[#1E3A5F] font-bold text-[10px] px-3 py-1.5 rounded">확인하기</button>
                    </div>
                </div>
                <div className="px-2 py-1 bg-gray-50 flex items-center justify-between">
                    <div className="text-[8px] text-gray-500">투자 정보 OO · 광고</div>
                    <div className="text-[8px] text-gray-400">Ads by Google</div>
                </div>
            </div>

            <div className="flex-1 px-3 py-1">
                <div className="space-y-1.5">
                    {[100, 85, 95, 70, 80, 60, 90, 75].map((w, i) => (
                        <div key={i} className="h-1.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
                    ))}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="text-[9px] text-gray-400 mb-1 font-bold">관련 광고</div>
                    <div className="flex items-center gap-2 p-1.5 border border-gray-100 rounded">
                        <div className="w-8 h-8 bg-[#FFF8E1] rounded flex-shrink-0" />
                        <div>
                            <div className="text-[9px] font-bold text-gray-700">시장 분석 정보</div>
                            <div className="text-[8px] text-gray-400">Ads by Google</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
