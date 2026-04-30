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
                <div className="aspect-[16/9] bg-gradient-to-br from-[#0891B2] to-[#0E4F6E] flex items-center justify-center text-white relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                    <div className="absolute top-2 left-2 bg-black/40 text-white text-[8px] px-2 py-0.5 rounded font-bold">광고</div>
                    <ImagePlaceholder accentColor="rgba(255,255,255,0.5)" label="광고주 카드 이미지" />
                    <div className="relative z-20 text-center px-4">
                        <div className="text-[14px] font-bold leading-tight">진료 예약 안내</div>
                        <div className="text-[10px] opacity-90 mt-1">OO 병원</div>
                    </div>
                </div>
                <div className="px-3 py-2 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="text-[12px] font-bold text-gray-900 leading-tight mb-1">진료 예약 안내</div>
                        <div className="text-[10px] text-gray-600 leading-snug">진료 과목 · 예약 정보</div>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0891B2] to-[#0E7490]" />
                        <div className="text-[9px] text-gray-500">OO 병원</div>
                    </div>
                </div>
            </div>

            <div className="mx-2 mb-1 rounded-xl overflow-hidden border border-gray-100 flex">
                <div className="w-14 h-14 bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">OO 진료 예약, 온라인 접수 방법</div>
                    <div className="text-[9px] text-gray-400 mt-0.5">HEALTH INFO · 2시간 전</div>
                </div>
            </div>

            <div className="mx-2 mb-2 rounded-xl overflow-hidden border border-gray-100 flex">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">진료 대기 시간 줄이는 방법 안내</div>
                    <div className="text-[9px] text-gray-400 mt-0.5">건강 매거진 · 1일 전</div>
                </div>
            </div>
        </div>
    );
}
