"use client";

export function GoogleGDNMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* 압축된 host 헤더 (1줄) */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                <div className="font-bold text-[11px] text-gray-700">DAILY NEWS</div>
                <div className="text-[8px] text-gray-400">2026.04.30</div>
            </div>

            {/* host 컨텐츠 (작게) */}
            <div className="px-3 pt-3 pb-2">
                <div className="text-[10px] font-bold text-gray-700 mb-1.5 leading-snug">
                    [경제] 가계부채 1,800조 돌파, 회생·파산 신청 사상 최고
                </div>
                <div className="space-y-1">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-1.5 bg-gray-100 rounded" style={{ width: `${100 - i * 8}%` }} />
                    ))}
                </div>
            </div>

            {/* GDN 배너 — 폰 중앙, 크게 */}
            <div className="mx-3 my-2 rounded-lg overflow-hidden border border-gray-200 shadow-md">
                <div className="bg-gradient-to-r from-[var(--coral-500)] to-[var(--navy)] p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">
                        법
                    </div>
                    <div className="flex-1 text-white">
                        <div className="text-[12px] font-bold leading-tight mb-1">변제계획 검토 무료</div>
                        <div className="text-[9px] opacity-90">개인회생·파산 법률상담</div>
                    </div>
                    <button className="bg-white text-[var(--navy)] font-bold text-[10px] px-3 py-1.5 rounded">
                        확인하기
                    </button>
                </div>
                <div className="px-2 py-1 bg-gray-50 flex items-center justify-between">
                    <div className="text-[8px] text-gray-500">법무법인 OO · 광고</div>
                    <div className="text-[8px] text-gray-400">Ads by Google</div>
                </div>
            </div>

            {/* host 컨텐츠 (계속) */}
            <div className="flex-1 px-3 py-2">
                <div className="space-y-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-1.5 bg-gray-100 rounded" style={{ width: `${100 - (i % 3) * 10}%` }} />
                    ))}
                </div>
                <div className="mt-3 text-[9px] text-gray-400">관련 기사 · 더 보기</div>
            </div>
        </div>
    );
}
