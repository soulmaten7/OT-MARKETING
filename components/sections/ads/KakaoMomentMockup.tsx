"use client";

export function KakaoMomentMockup() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FEE500]">
            {/* 광고 카드 — 풀스크린 */}
            <div className="flex-1 flex flex-col">
                {/* 이미지 영역 */}
                <div className="flex-[2] flex items-center justify-center px-6 relative overflow-hidden">
                    {/* 배경 장식 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white/30 rounded-full" />
                    </div>
                    <div className="absolute top-3 right-3 bg-[#3C1E1E]/20 text-[#3C1E1E] text-[9px] px-2 py-0.5 rounded font-bold">
                        광고
                    </div>
                    <div className="relative text-center text-[#3C1E1E]">
                        <div className="text-[11px] font-bold tracking-widest mb-3 opacity-70">
                            카카오톡 추천 콘텐츠
                        </div>
                        <div className="text-[24px] font-bold leading-tight mb-3">
                            월 100만원<br />변제금 부담?
                        </div>
                        <div className="text-[12px] opacity-80">
                            변제계획 검토 무료
                        </div>
                    </div>
                </div>

                {/* 카피 + CTA — 폰 하단 */}
                <div className="bg-[#3C1E1E] text-white px-5 py-4">
                    <div className="text-[12px] font-bold mb-1">법무법인 OO</div>
                    <div className="text-[10px] opacity-80 mb-3 leading-relaxed">
                        자가진단 1분 완성. 본인 회생 가능 여부 무료 확인.
                    </div>
                    <button className="w-full bg-[#FEE500] text-[#3C1E1E] font-bold py-2 rounded text-[11px]">
                        자세히 보기
                    </button>
                </div>
            </div>
        </div>
    );
}
