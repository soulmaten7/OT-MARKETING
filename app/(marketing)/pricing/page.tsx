import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section, SectionHeader, SectionTitle } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "요금제 — OT MARKETING",
    description:
        "구독형 랜딩페이지 단일 플랜 + 문자문의 만들기 무료 + CPA 광고 건당 정산. 필요한 만큼만 사용하세요.",
    openGraph: {
        title: "요금제 — OT MARKETING",
        description: "구독형 랜딩페이지 단일 플랜. 문자문의 만들기는 완전 무료로 시작하세요.",
        type: "website",
    },
};

const LANDING_PRICE = "[가격 입력]";

const PLAN_FEATURES = [
    "코딩 없이 5분 만에 랜딩페이지 완성",
    "업종별 검증된 전환 패턴 (6 업종)",
    "DB 자동 수집 + 구글 시트 분배",
    "텔레그램 실시간 신청 알림",
    "[추가 기능 입력]",
    "[추가 기능 입력]",
];

const FAQ_ITEMS = [
    {
        q: "구독료는 언제 결제되나요?",
        a: "[답변 입력]",
    },
    {
        q: "중간에 해지할 수 있나요?",
        a: "[답변 입력]",
    },
    {
        q: "환불 정책은 어떻게 되나요?",
        a: "[답변 입력]",
    },
    {
        q: "문자문의 만들기는 정말 무료인가요?",
        a: "네, 신용카드 등록 없이 가입만 하면 됩니다. 결제 정보 불필요.",
    },
    {
        q: "CPA 광고 비용은 어떻게 책정되나요?",
        a: "[답변 입력]",
    },
    {
        q: "결제 수단은 무엇이 있나요?",
        a: "토스페이먼츠 (카드·카카오페이·네이버페이)",
    },
];

export default function PricingPage() {
    return (
        <>
            {/* Hero */}
            <Section variant="white" size="xl" className="pt-24 md:pt-32">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                        심플한 요금제
                    </h1>
                    <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
                        필요한 만큼만. 구독형 랜딩페이지는 단일 플랜으로,<br />
                        문자문의 만들기는 완전 무료로 시작하세요.
                    </p>
                </div>
            </Section>

            {/* 메인 플랜 — 구독형 랜딩페이지 */}
            <Section variant="muted" size="lg">
                <div className="max-w-md mx-auto">
                    <Card variant="primary" className="p-8 ring-2 ring-primary-300">
                        <div className="text-center mb-6">
                            <Badge variant="primary" className="mb-4">구독형 랜딩페이지</Badge>
                            <div className="mt-3">
                                <span className="text-5xl font-bold text-neutral-900">
                                    ₩{LANDING_PRICE}
                                </span>
                                <span className="text-lg text-neutral-500 ml-1">/월</span>
                            </div>
                            <p className="text-sm text-neutral-600 mt-2">
                                업종별 검증된 랜딩페이지를 월 구독으로
                            </p>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {PLAN_FEATURES.map((f) => (
                                <li key={f} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-primary-600" />
                                    </div>
                                    <span className="text-sm text-neutral-700">{f}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center w-full px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-base transition-colors"
                        >
                            무료로 시작하기
                        </Link>
                        <p className="text-xs text-neutral-400 text-center mt-3">
                            첫 랜딩페이지는 무료로 만들어볼 수 있어요
                        </p>
                    </Card>
                </div>
            </Section>

            {/* 보조 카드 — 문자문의 만들기 + CPA */}
            <Section variant="white" size="lg">
                <SectionHeader>
                    <SectionTitle>다른 서비스</SectionTitle>
                </SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {/* 문자문의 만들기 — 무료 */}
                    <Card className="p-6">
                        <Badge variant="success">무료</Badge>
                        <h3 className="text-xl font-bold text-neutral-900 mt-3">문자문의 만들기</h3>
                        <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                            블로그 콘텐츠 + 문자 자동화.<br />가입만 하면 바로 사용.
                        </p>
                        <div className="text-3xl font-bold text-neutral-900 mt-4">
                            ₩0
                        </div>
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-semibold rounded-full text-sm transition-colors"
                        >
                            무료로 시작하기
                        </Link>
                    </Card>

                    {/* CPA 광고 — 건당 정산 */}
                    <Card className="p-6">
                        <Badge variant="neutral">건당 정산</Badge>
                        <h3 className="text-xl font-bold text-neutral-900 mt-3">CPA 광고</h3>
                        <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                            검증된 광고 인프라로 실제 DB를.<br />정산은 성과 기반.
                        </p>
                        <p className="text-sm text-neutral-500 mt-4 font-medium">
                            업종·물량별 맞춤 견적
                        </p>
                        <Link
                            href="/cpa"
                            className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-semibold rounded-full text-sm transition-colors"
                        >
                            광고 문의하기
                        </Link>
                    </Card>
                </div>
            </Section>

            {/* 요금 FAQ */}
            <Section variant="muted" size="lg" id="faq">
                <SectionHeader>
                    <SectionTitle>자주 묻는 질문</SectionTitle>
                </SectionHeader>
                <div className="max-w-2xl mx-auto space-y-2">
                    {FAQ_ITEMS.map((item) => (
                        <details
                            key={item.q}
                            className="group bg-white rounded-xl border border-neutral-200 overflow-hidden"
                        >
                            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                                {item.q}
                                <span className="ml-4 text-neutral-400 group-open:rotate-180 transition-transform inline-block select-none">
                                    ▾
                                </span>
                            </summary>
                            <div className="px-5 pb-5 pt-2 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </Section>

            {/* 하단 CTA */}
            <Section variant="primary" size="lg">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary-900 tracking-tight">
                        지금 무료로 시작하고,<br />필요할 때 구독하세요
                    </h2>
                    <p className="mt-4 text-base text-primary-700">
                        문자문의 만들기는 무료. 구독형 랜딩페이지는 언제든 시작할 수 있어요.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-base transition-colors"
                        >
                            무료로 시작하기
                        </Link>
                        <Link
                            href="/landing-pages"
                            className="inline-flex items-center justify-center px-8 py-3.5 border border-primary-300 text-primary-700 hover:bg-primary-100 font-semibold rounded-full text-base transition-colors"
                        >
                            랜딩페이지 소개 보기
                        </Link>
                    </div>
                </div>
            </Section>
        </>
    );
}
