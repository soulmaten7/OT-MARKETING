"use client";

export function KakaoMomentMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-white text-xs">
            {/* 상단 */}
            <div className="flex items-center justify-between px-3 h-10 border-b border-gray-100 flex-shrink-0">
                <div
                    className="font-extrabold text-[11px] px-2 py-0.5 rounded"
                    style={{ background: "#FEE500", color: "#3C1E1E" }}
                >
                    kakao
                </div>
                <div className="text-[10px] text-gray-500">추천 콘텐츠</div>
            </div>

            {/* 광고 카드 */}
            <div
                className="mx-2 mt-3 rounded-xl overflow-hidden flex-shrink-0"
                style={{ background: "#FEE500" }}
            >
                {/* 이미지 영역 */}
                <div
                    className="w-full aspect-square flex flex-col items-center justify-center gap-2"
                    style={{ background: "#FEE500" }}
                >
                    {/* 간단 일러스트 (도형) */}
                    <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/60" />
                        <div className="w-8 h-8 rounded-lg" style={{ background: "#3C1E1E", opacity: 0.2 }} />
                    </div>
                    <div
                        className="text-[10px] font-bold text-center px-2"
                        style={{ color: "#3C1E1E" }}
                    >
                        월 100만원<br />변제금 부담되시나요?
                    </div>
                </div>

                {/* 텍스트 */}
                <div className="px-3 py-2" style={{ background: "#FEE500" }}>
                    <div
                        className="text-[11px] font-bold mb-1 leading-tight"
                        style={{ color: "#3C1E1E" }}
                    >
                        월 100만원 변제금 부담되시나요?
                    </div>
                    <div className="text-[10px] mb-2" style={{ color: "#3C1E1E", opacity: 0.8 }}>
                        변제계획 검토 무료. 자가진단 1분 완성.
                    </div>
                    <div className="text-[9px] text-gray-500 mb-2">광고</div>
                    <button
                        className="w-full py-2 rounded text-[11px] font-bold text-white"
                        style={{ background: "#3C1E1E" }}
                    >
                        자세히 보기
                    </button>
                </div>
            </div>

            {/* 다음 카드 (흐릿) */}
            <div className="mx-2 mt-2 flex-1 opacity-30">
                <div className="h-24 bg-gray-100 rounded-xl" />
            </div>
        </div>
    );
}
