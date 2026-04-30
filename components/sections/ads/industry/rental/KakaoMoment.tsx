"use client";

export function KakaoMoment() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FEE500]">
            <div className="flex-1 flex flex-col">
                <div className="flex-[2] flex items-center justify-center px-6 relative overflow-hidden">
                    {/* wave circles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-28 h-28 border-2 border-[#0099CC]/30 rounded-full" />
                        <div className="absolute w-20 h-20 border-2 border-[#0099CC]/40 rounded-full" />
                    </div>
                    {/* water drop */}
                    <div className="absolute top-5 right-6 opacity-30">
                        <svg viewBox="0 0 24 30" className="w-7 h-9" fill="#0099CC">
                            <path d="M12 2 C12 2 2 11 2 19 C2 24.5 6.5 28 12 28 C17.5 28 22 24.5 22 19 C22 11 12 2 12 2Z" />
                        </svg>
                    </div>
                    <div className="absolute top-3 right-3 bg-[#3C1E1E]/20 text-[#3C1E1E] text-[9px] px-2 py-0.5 rounded font-bold">광고</div>
                    <div className="relative text-center text-[#3C1E1E]">
                        <div className="text-[10px] font-bold tracking-widest mb-2 opacity-70">정수기 렌탈</div>
                        <div className="mb-1">
                            <span className="text-[40px] font-black leading-none">36</span>
                            <span className="text-[14px] font-bold ml-1">개월</span>
                        </div>
                        <div className="text-[12px] font-bold">무이자 할부</div>
                    </div>
                </div>
                <div className="bg-[#0077B6] text-white px-5 py-4">
                    <div className="text-[12px] font-bold mb-1">정수기 브랜드 OO</div>
                    <div className="text-[10px] opacity-80 mb-3 leading-relaxed">
                        무이자 36개월 · 월 OO원 · 총액 명시.
                    </div>
                    <button className="w-full bg-[#FEE500] text-[#3C1E1E] font-bold py-2 rounded text-[11px]">
                        비교 보기
                    </button>
                </div>
            </div>
        </div>
    );
}
