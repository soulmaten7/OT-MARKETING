"use client";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/sections/ads/ImagePlaceholder";

export function GoogleGDN() {
    return (
        <div className="w-full h-full flex flex-col bg-white" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 flex-shrink-0">
                <div className="font-black text-[12px] text-gray-900 tracking-tight">HEALTH INFO</div>
                <div className="text-[8px] text-gray-500">건강 정보</div>
            </div>

            <div className="px-3 pt-2 pb-1 flex-shrink-0">
                <div className="text-[9px] font-bold text-[#EA4335] mb-1">[건강]</div>
                <div className="text-[10px] font-bold text-gray-900 mb-1.5 leading-snug">OO 진료 예약, 대기 시간 단축 방법 안내</div>
                <div className="text-[8px] text-gray-500 mb-2">건강 매거진 · 1시간 전</div>
                <div className="space-y-1">
                    {[100, 88, 75].map((w, i) => (
                        <div key={i} className="h-1.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
                    ))}
                </div>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }} className="mx-3 my-2 rounded-lg overflow-hidden border border-gray-200 shadow-md flex-shrink-0">
                <div className="flex">
                    <div className="w-[35%] bg-gradient-to-br from-[#0891B2] to-[#0E4F6E] relative aspect-square">
                        <ImagePlaceholder accentColor="rgba(255,255,255,0.6)" label="배너" size="sm" />
                        <div className="absolute top-1 left-1 bg-black/50 text-white text-[7px] px-1 py-0.5 rounded font-bold">광고</div>
                    </div>
                    <div className="flex-1 px-2.5 py-2 bg-white flex flex-col justify-between">
                        <div>
                            <div className="text-[11px] font-bold text-gray-900 leading-tight mb-1">진료 정보 안내</div>
                            <div className="text-[8px] text-gray-600 leading-snug">예약·진료 시간 확인</div>
                        </div>
                        <button className="bg-[#1A73E8] text-white font-bold text-[9px] px-2 py-1 rounded mt-2 self-start">
                            확인하기
                        </button>
                    </div>
                </div>
                <div className="px-2 py-1 bg-gray-50 flex items-center justify-between border-t border-gray-200">
                    <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                            <span className="w-1 h-1 rounded-full bg-[#4285F4]" />
                            <span className="w-1 h-1 rounded-full bg-[#EA4335]" />
                            <span className="w-1 h-1 rounded-full bg-[#FBBC05]" />
                            <span className="w-1 h-1 rounded-full bg-[#34A853]" />
                        </div>
                        <div className="text-[7px] text-gray-500">OO 병원 · 광고</div>
                    </div>
                    <div className="text-[7px] text-gray-400">Ads by Google</div>
                </div>
            </motion.div>

            <div className="flex-1 px-3 py-1">
                <div className="space-y-1.5">
                    {[100, 85, 95, 70, 80, 60, 90, 75].map((w, i) => (
                        <div key={i} className="h-1.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
                    ))}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="text-[9px] text-gray-500 mb-1 font-bold">관련 기사</div>
                    <div className="flex items-center gap-2 p-1.5 border border-gray-100 rounded">
                        <div className="w-7 h-7 bg-[#E0F7FA] rounded flex-shrink-0" />
                        <div>
                            <div className="text-[9px] font-bold text-gray-700 leading-tight">진료 예약 안내 정리</div>
                            <div className="text-[7px] text-gray-400">HEALTH INFO</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
