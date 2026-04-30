"use client";

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
                <div className="aspect-[16/9] bg-gradient-to-br from-[#6C63FF] to-[#2D1FA3] flex items-center justify-center text-white relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                    <div className="absolute top-2 left-2 bg-black/40 text-white text-[8px] px-2 py-0.5 rounded font-bold">광고</div>
                    <div className="text-center px-4">
                        <div className="text-[20px] font-black leading-tight">5G</div>
                        <div className="text-[10px] opacity-90 mt-1">요금 비교 안내</div>
                    </div>
                </div>
                <div className="px-3 py-2 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="text-[12px] font-bold text-gray-900 leading-tight mb-1">5G 요금제 비교 — 통신사 OO</div>
                        <div className="text-[10px] text-gray-600 leading-snug">월 OO원부터 · 데이터 무제한 · 무약정</div>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#2D1FA3]" />
                        <div className="text-[9px] text-gray-500">통신사 OO</div>
                    </div>
                </div>
            </div>

            <div className="mx-2 mb-1 rounded-xl overflow-hidden border border-gray-100 flex">
                <div className="w-14 h-14 bg-gradient-to-br from-[#EDE9FF] to-[#C4B5FD] flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">5G vs LTE 요금 비교 분석</div>
                    <div className="text-[9px] text-gray-400 mt-0.5">TECH NEWS · 2시간 전</div>
                </div>
            </div>

            <div className="mx-2 mb-2 rounded-xl overflow-hidden border border-gray-100 flex">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">가족 결합 할인 요금 정리</div>
                    <div className="text-[9px] text-gray-400 mt-0.5">통신 매거진 · 5시간 전</div>
                </div>
            </div>
        </div>
    );
}
