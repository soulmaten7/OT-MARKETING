"use client";

export function Karrot() {
    return (
        <div className="w-full h-full flex flex-col bg-[#FAF7F2]">
            <div className="flex-[2] bg-gradient-to-br from-[#7C73FF] to-[#4834D4] flex items-center justify-center text-white relative overflow-hidden">
                {/* signal arcs */}
                <div className="absolute bottom-4 right-4 opacity-25">
                    <svg viewBox="0 0 40 32" className="w-12 h-10" fill="none">
                        <circle cx="20" cy="32" r="6" stroke="white" strokeWidth="2" />
                        <path d="M10 22 Q20 12 30 22" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <path d="M3 14 Q20 2 37 14" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded">광고</div>
                <div className="relative text-center px-6">
                    <div className="text-[10px] font-bold tracking-widest mb-2 opacity-90">OO동 비즈프로필</div>
                    <div className="text-[22px] font-bold leading-tight mb-1">5G 요금 비교</div>
                    <div className="text-[12px] font-bold mb-2">월 OO원 · 무약정</div>
                    <div className="text-[11px] opacity-90">가입비 X · 데이터 무제한</div>
                </div>
            </div>

            <div className="flex-1 px-4 py-3 bg-white">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#4834D4] flex items-center justify-center text-white font-bold text-xs">5G</div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[12px] text-[#1F1F1F]">통신사 OO</div>
                        <div className="text-[10px] text-gray-500">OO동 · 비즈프로필</div>
                    </div>
                    <div className="text-[10px] font-bold text-[#FF7E36]">방문</div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-[9px] bg-[#EDE9FF] text-[#4834D4] px-2 py-0.5 rounded-full font-bold">5G 무제한</span>
                    <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">무약정</span>
                </div>
                <div className="text-[10px] text-gray-600 leading-relaxed">
                    5G 요금 안내. 데이터 무제한, 가입비 없음, 약정 자유 선택.
                </div>
            </div>
        </div>
    );
}
