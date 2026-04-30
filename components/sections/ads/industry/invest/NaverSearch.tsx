"use client";

export function NaverSearch() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-[#03C75A]">
                <div className="w-5 h-5 bg-[#03C75A] text-white font-bold text-[10px] flex items-center justify-center rounded">N</div>
                <div className="flex-1 text-[12px] text-[#1F1F1F] font-bold">투자 정보 안내</div>
                <div className="text-[#03C75A] text-[10px]">🔍</div>
            </div>

            <div className="flex-1 px-3 py-3 bg-gradient-to-b from-[#FFFBEB] to-white">
                <div className="inline-block bg-[#FF6F00] text-white text-[9px] font-bold px-2 py-0.5 rounded mb-2">광고</div>
                <div className="text-[10px] text-[#03C75A] font-bold mb-1">invest-info-oo.com</div>
                <div className="text-[15px] font-bold text-[#1F1F1F] leading-snug mb-2">
                    투자 정보 안내<br />— 종목 분석
                </div>
                <div className="text-[10px] text-gray-600 leading-relaxed mb-3">
                    차트 분석 · 시황 · 산업 동향 정보 안내. (수익률·보장 표현 없음)
                </div>
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                    {["차트 분석", "시황 정보", "산업 동향", "종목 안내"].map((s) => (
                        <div key={s} className="text-[9px] text-[#03C75A] border border-[#03C75A]/30 px-2 py-1 rounded text-center">{s}</div>
                    ))}
                </div>
                <div className="bg-[#FFFBEB] border-l-4 border-[#F0B429] px-3 py-2 rounded-r">
                    <div className="text-[10px] font-bold text-[#1F1F1F]">📊 시장 분석 무료 안내 · 공부 중심</div>
                </div>
            </div>

            <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
                <div className="text-[9px] text-gray-400 font-bold mb-1">관련 검색</div>
                <div className="text-[10px] text-gray-600">차트 분석 / 시황 정보 / 종목 공부</div>
            </div>
        </div>
    );
}
