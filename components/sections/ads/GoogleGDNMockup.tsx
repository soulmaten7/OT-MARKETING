"use client";

export function GoogleGDNMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white text-xs">
            {/* 가짜 뉴스 사이트 헤더 */}
            <div className="flex items-center justify-between px-3 h-10 border-b border-gray-200 pt-6">
                <div className="font-bold text-gray-800 text-sm">NEWS</div>
                <div className="flex gap-2 text-[9px] text-gray-500">
                    <span>홈</span>
                    <span>경제</span>
                    <span>정치</span>
                </div>
            </div>

            {/* 본문 텍스트 placeholder */}
            <div className="px-3 py-3 space-y-1.5">
                <div className="h-2.5 bg-gray-300 rounded w-3/4" />
                <div className="h-1.5 bg-gray-200 rounded w-full" />
                <div className="h-1.5 bg-gray-200 rounded w-full" />
                <div className="h-1.5 bg-gray-200 rounded w-2/3" />
            </div>

            {/* GDN 배너 (300×250 형태 in-feed) */}
            <div className="mx-3 my-2 border border-gray-300 rounded-md overflow-hidden flex bg-white shadow-sm relative">
                <div className="absolute top-1 right-1 z-10 text-[7px] text-gray-500 bg-white/80 px-1 rounded">Ads by Google</div>
                <div className="w-2/5 aspect-square bg-gradient-to-br from-[var(--coral-500)] to-[var(--navy)] flex items-center justify-center">
                    <div className="text-white text-[8px] font-bold text-center px-1 leading-tight">
                        법률<br />상담<br />무료
                    </div>
                </div>
                <div className="flex-1 p-2 flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-[var(--navy)] leading-tight mb-1">
                        변제계획<br />검토 무료
                    </div>
                    <div className="text-[8px] text-gray-500 mb-1.5">법무법인 OO</div>
                    <button className="bg-[#1A73E8] text-white text-[8px] font-bold py-1 px-2 rounded self-start">확인하기</button>
                </div>
            </div>

            {/* 본문 더 */}
            <div className="px-3 py-2 space-y-1.5 flex-1">
                <div className="h-1.5 bg-gray-200 rounded w-full" />
                <div className="h-1.5 bg-gray-200 rounded w-full" />
                <div className="h-1.5 bg-gray-200 rounded w-3/4" />
                <div className="h-1.5 bg-gray-200 rounded w-1/2" />
            </div>

            {/* Google 4컬러 dot footer */}
            <div className="flex items-center justify-center h-8 gap-1 border-t border-gray-100 flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
            </div>
        </div>
    );
}
