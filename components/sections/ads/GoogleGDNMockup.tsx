"use client";

export function GoogleGDNMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white text-xs overflow-hidden">
            {/* 가짜 뉴스 헤더 */}
            <div className="flex items-center justify-between px-3 h-8 border-b border-gray-200 flex-shrink-0">
                <div className="font-bold text-[10px] text-gray-700">DAILY NEWS</div>
                <div className="flex gap-2 text-[9px] text-gray-400">
                    <span>사회</span><span>경제</span><span>스포츠</span>
                </div>
            </div>

            {/* 뉴스 콘텐츠 (placeholder lines) */}
            <div className="px-3 py-2 space-y-1.5 flex-shrink-0 opacity-60">
                <div className="h-2.5 bg-gray-200 rounded w-full" />
                <div className="h-2.5 bg-gray-200 rounded w-5/6" />
                <div className="h-2.5 bg-gray-100 rounded w-4/6" />
            </div>

            {/* GDN 배너 (중앙 삽입) */}
            <div className="mx-2 my-2 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                <div className="flex h-20">
                    {/* 이미지 영역 */}
                    <div className="w-24 bg-gradient-to-br from-[var(--coral-500)] to-[var(--navy)] flex items-center justify-center text-white text-[10px] font-bold text-center px-1">
                        법무법인<br />OO
                    </div>
                    {/* 텍스트 영역 */}
                    <div className="flex-1 px-2 py-2 flex flex-col justify-between bg-white">
                        <div>
                            <div className="text-[11px] font-bold text-[var(--navy)] leading-tight">
                                변제계획 검토 무료
                            </div>
                            <div className="text-[9px] text-gray-500 mt-0.5">
                                개인회생·파산 법률상담
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <button className="bg-[#1A73E8] text-white text-[9px] font-bold px-2 py-1 rounded">
                                확인하기
                            </button>
                            <span className="text-[8px] text-gray-400">Ads by Google</span>
                        </div>
                    </div>
                </div>
                {/* Google 4컬러 dot */}
                <div className="flex gap-0.5 px-2 py-1 bg-gray-50 border-t border-gray-100">
                    {["#4285F4","#EA4335","#FBBC05","#34A853"].map((c, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                    ))}
                    <span className="text-[8px] text-gray-400 ml-1">Google GDN</span>
                </div>
            </div>

            {/* 이어지는 뉴스 (흐릿) */}
            <div className="px-3 flex-1 space-y-1.5 opacity-30">
                <div className="h-2.5 bg-gray-200 rounded w-full" />
                <div className="h-2.5 bg-gray-200 rounded w-3/4" />
                <div className="h-16 bg-gray-100 rounded mt-2" />
                <div className="h-2.5 bg-gray-200 rounded w-5/6" />
                <div className="h-2.5 bg-gray-200 rounded w-2/3" />
            </div>
        </div>
    );
}
