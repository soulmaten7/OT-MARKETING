import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "새 랜딩페이지 만들기 — OT MARKETING",
    robots: { index: false, follow: false },
};

const INDUSTRIES = [
    {
        id: "debt",
        name: "개인회생·파산",
        description: "채무 해결 상담 신청. 4단계 자가진단 내장.",
        status: "active" as const,
        emoji: "⚖️",
    },
    {
        id: "rental",
        name: "정수기·렌탈",
        description: "렌탈 상품 신청 LP. 혜택·가격 강조.",
        status: "active" as const,
        emoji: "💧",
    },
    {
        id: "broadband",
        name: "인터넷·통신",
        description: "인터넷 설치·개통 신청 LP.",
        status: "active" as const,
        emoji: "📡",
    },
    {
        id: "invest",
        name: "주식·투자",
        description: "투자 상담·세미나 신청 LP.",
        status: "coming" as const,
        emoji: "📈",
    },
    {
        id: "realestate",
        name: "부동산·임대",
        description: "매물 상담·분양 신청 LP.",
        status: "coming" as const,
        emoji: "🏠",
    },
    {
        id: "medical",
        name: "의료·병원",
        description: "병원 예약·상담 신청 LP.",
        status: "coming" as const,
        emoji: "🏥",
    },
] as const;

export default function NewLandingPage() {
    return (
        <main className="min-h-screen bg-neutral-50">
            {/* 헤더 */}
            <header className="bg-white border-b border-neutral-100 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-3">
                    <Link
                        href="/landing-pages/manage"
                        className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        내 랜딩페이지
                    </Link>
                    <span className="text-neutral-200">/</span>
                    <span className="text-sm font-semibold text-neutral-900">업종 선택</span>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="mb-10 text-center">
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                        어떤 업종의 랜딩페이지를 만들까요?
                    </h1>
                    <p className="text-sm text-neutral-500">
                        업종을 선택하면 검증된 전환 패턴이 자동으로 적용됩니다.
                    </p>
                </div>

                {/* 업종 선택 그리드 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INDUSTRIES.map((industry) => {
                        const isActive = industry.status === "active";
                        return (
                            <div key={industry.id}>
                                {isActive ? (
                                    <Link
                                        href={`/landing-pages/manage/new/${industry.id}`}
                                        className="flex items-center gap-4 bg-white rounded-2xl border border-neutral-200 p-5 hover:border-primary-300 hover:shadow-md transition-all group"
                                    >
                                        <span className="text-3xl">{industry.emoji}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-neutral-900 text-sm">{industry.name}</span>
                                                <Badge variant="success" className="text-xs">사용 가능</Badge>
                                            </div>
                                            <p className="text-xs text-neutral-500">{industry.description}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-primary-500 transition-colors shrink-0" />
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-4 bg-white rounded-2xl border border-neutral-100 p-5 opacity-60 cursor-not-allowed">
                                        <span className="text-3xl grayscale">{industry.emoji}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-neutral-500 text-sm">{industry.name}</span>
                                                <Badge variant="neutral" className="text-xs">준비 중</Badge>
                                            </div>
                                            <p className="text-xs text-neutral-400">{industry.description}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <p className="text-center text-xs text-neutral-400 mt-8">
                    주식·투자, 부동산·임대, 의료·병원 업종은 순차 오픈 예정입니다.
                </p>
            </div>
        </main>
    );
}
