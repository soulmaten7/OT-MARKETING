"use client";

export function KakaoMomentMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white text-xs">
            {/* 상단 바 */}
            <div className="flex items-center justify-between px-3 h-10 bg-[#FEE500] pt-6">
                <div className="font-extrabold text-[#3C1E1E] text-sm">kakao</div>
                <div className="text-[10px] font-bold text-[#3C1E1E]">추천 콘텐츠</div>
            </div>

            {/* 광고 카드 */}
            <div className="p-3 flex-1 flex flex-col">
                <div className="bg-[#FEE500] rounded-xl overflow-hidden flex-1 flex flex-col relative">
                    <div className="absolute top-2 right-2 z-10 text-[8px] bg-black/30 text-white px-1.5 py-0.5 rounded font-semibold">광고</div>

                    {/* 일러스트 영역 */}
                    <div className="aspect-square bg-white flex items-center justify-center p-4 m-3 rounded-lg">
                        <div className="text-center">
                            {/* 간단 도형 — 동전 + 화살표 다운 */}
                            <div className="flex justify-center gap-1 mb-2">
                                <div className="w-8 h-8 rounded-full bg-[#FEE500] border-2 border-[#3C1E1E] flex items-center justify-center text-[10px] font-bold text-[#3C1E1E]">₩</div>
                                <div className="text-2xl text-[#3C1E1E] font-bold">↓</div>
                            </div>
                            <div className="text-[9px] text-[#3C1E1E] font-semibold">변제계획 검토</div>
                        </div>
                    </div>

                    {/* 제목 + 본문 */}
                    <div className="px-4 pb-2">
                        <div className="text-[14px] font-extrabold text-[#3C1E1E] leading-tight mb-1.5">
                            월 100만원 변제금<br />부담되시나요?
                        </div>
                        <p className="text-[10px] text-[#3C1E1E]/80 leading-relaxed mb-3">
                            변제계획 검토 무료. 자가진단 1분 완성.
                        </p>
                        <button className="w-full bg-[#3C1E1E] text-white font-bold py-2 rounded-md text-[11px]">
                            자세히 보기
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-around h-8 border-t border-gray-100 flex-shrink-0">
                <div className="w-2 h-2 bg-[#FEE500] rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
            </div>
        </div>
    );
}
