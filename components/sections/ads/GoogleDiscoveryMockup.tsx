"use client";

export function GoogleDiscoveryMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* 압축된 Google 헤더 */}
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

            {/* 광고 카드 (메인) — 폰의 60% */}
            <div className="flex-[3] m-2 mb-1 rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col">
                {/* 이미지 */}
                <div className="aspect-[16/10] bg-gradient-to-br from-[var(--coral-500)] via-[var(--coral-600)] to-[var(--navy)] flex items-center justify-center text-white relative">
                    <div className="absolute top-2 left-2 bg-black/40 text-white text-[8px] px-2 py-0.5 rounded font-bold">광고</div>
                    <div className="text-center px-4">
                        <div className="text-[16px] font-bold leading-tight">법률상담 무료</div>
                        <div className="text-[10px] opacity-90 mt-1">회생·파산 검토</div>
                    </div>
                </div>
                {/* 정보 */}
                <div className="px-3 py-2 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="text-[12px] font-bold text-gray-900 leading-tight mb-1">
                            법률상담 무료 — 회생·파산 검토
                        </div>
                        <div className="text-[10px] text-gray-600 leading-snug">
                            본인 상황에 맞는 회생 절차 1분 자가진단
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--navy)] to-[var(--coral-500)]" />
                        <div className="text-[9px] text-gray-500">법무법인 OO</div>
                    </div>
                </div>
            </div>

            {/* 유기 카드 1 */}
            <div className="mx-2 mb-1 rounded-xl overflow-hidden border border-gray-100 flex">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">
                        가계부채 1,800조, 회생·파산 사상 최고
                    </div>
                    <div className="text-[9px] text-gray-400 mt-0.5">DAILY NEWS · 2시간 전</div>
                </div>
            </div>

            {/* 유기 카드 2 — 빈 공간 제거 */}
            <div className="mx-2 mb-2 rounded-xl overflow-hidden border border-gray-100 flex">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0" />
                <div className="flex-1 px-2 py-1.5">
                    <div className="text-[10px] font-bold leading-tight text-gray-700">
                        개인회생 절차, 신청 자격 정리
                    </div>
                    <div className="text-[9px] text-gray-400 mt-0.5">법률 정보 · 5시간 전</div>
                </div>
            </div>
        </div>
    );
}
