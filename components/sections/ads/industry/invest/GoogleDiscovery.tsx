"use client";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function GoogleDiscovery() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                <div className="flex gap-0.5">
                    <span className="text-[#4285F4] font-bold text-sm">G</span>
                    <span className="text-[#EA4335] font-bold text-sm">o</span>
                    <span className="text-[#FBBC05] font-bold text-sm">o</span>
                    <span className="text-[#4285F4] font-bold text-sm">g</span>
                    <span className="text-[#34A853] font-bold text-sm">l</span>
                    <span className="text-[#EA4335] font-bold text-sm">e</span>
                </div>
                <div className="ml-auto text-[10px] text-gray-400">디스커버</div>
            </div>

            <div className="flex-[3] m-2 rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col">
                <div className="aspect-[16/9] bg-gradient-to-br from-[#1E3A5F] to-[#0A1628] flex items-center justify-center text-white relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "8px 8px" }} />
                    <div className="absolute top-2 left-2 bg-black/40 text-white text-[8px] px-2 py-0.5 rounded font-bold">광고</div>
                    <ImagePlaceholder accentColor="rgba(255,255,255,0.5)" label="광고주 카드 이미지" />
                    <div className="relative z-20 text-center px-4">
                        <div className="text-[14px] font-bold leading-tight text-[#F0B429]">투자 정보</div>
                        <div className="text-[10px] opacity-80 mt-1">무료 안내</div>
                    </div>
                </div>
                <div className="px-3 py-2 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="text-[12px] font-bold text-gray-900 leading-tight mb-1">투자 정보 안내 — 차트 분석</div>
                        <div className="text-[10px] text-gray-600 leading-snug">시황 · 산업 동향 (수익률 보장 X)</div>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#F0B429]" />
                        <div className="text-[9px] text-gray-500">투자 정보 OO</div>
                    </div>
                </div>
            </div>

            <div className="mx-2 mb-1 rounded-xl overflow-hidden border border-gray-100 flex">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FFF8E1] to-[#FEE78A] flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">차트 분석 공부 방법 정리</div>
                    <div className="text-[9px] text-gray-400 mt-0.5">FINANCE NEWS · 4시간 전</div>
                </div>
            </div>

            <div className="mx-2 mb-2 rounded-xl overflow-hidden border border-gray-100 flex">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">시황 분석 용어 입문 가이드</div>
                    <div className="text-[9px] text-gray-400 mt-0.5">투자 공부 · 1일 전</div>
                </div>
            </div>
        </div>
    );
}
