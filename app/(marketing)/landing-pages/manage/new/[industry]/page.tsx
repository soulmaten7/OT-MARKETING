import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "랜딩페이지 빌더 — OT MARKETING",
    robots: { index: false, follow: false },
};

const INDUSTRY_NAMES: Record<string, string> = {
    debt: "개인회생·파산",
    rental: "정수기·렌탈",
    broadband: "인터넷·통신",
    invest: "주식·투자",
    realestate: "부동산·임대",
    medical: "의료·병원",
};

export default async function IndustryBuilderPage({
    params,
}: {
    params: Promise<{ industry: string }>;
}) {
    const { industry } = await params;
    const industryName = INDUSTRY_NAMES[industry] ?? industry;

    return (
        <main className="min-h-screen bg-neutral-50">
            <header className="bg-white border-b border-neutral-100 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-3">
                    <Link
                        href="/landing-pages/manage/new"
                        className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        업종 선택
                    </Link>
                    <span className="text-neutral-200">/</span>
                    <span className="text-sm font-semibold text-neutral-900">{industryName}</span>
                </div>
            </header>

            <div className="max-w-2xl mx-auto px-6 py-20 text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Wrench className="w-8 h-8 text-primary-400" />
                </div>
                <Badge variant="primary" className="mb-4">STEP_107 예정</Badge>
                <h1 className="text-2xl font-bold text-neutral-900 mb-3">
                    {industryName} 빌더 준비 중
                </h1>
                <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
                    브랜드명·질문·옵션을 입력하면 5분 만에 랜딩페이지가 완성됩니다.<br />
                    STEP_107에서 빌더 로직을 구현할 예정입니다.
                </p>
                <Link
                    href="/landing-pages/manage"
                    className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold py-2.5 px-5 rounded-xl text-sm transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    관리 페이지로 돌아가기
                </Link>
            </div>
        </main>
    );
}
