import Link from "next/link";
import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "구독형 랜딩페이지 — One Trillion",
    description:
        "코딩 없이 5분, 업종별 검증된 랜딩페이지. DB 수집에 최적화된 랜딩페이지를 월 구독으로. 개인회생·정수기·인터넷·주식·부동산·의료 6 업종.",
    openGraph: {
        title: "구독형 랜딩페이지 — One Trillion",
        description: "코딩 없이 5분, 업종별 검증된 랜딩페이지를 월 구독으로.",
        type: "website",
    },
};

const VALUE_PROPS = [
    {
        title: "5분 완성",
        body: "코딩·디자인 지식 0. 업종 선택 → 정보 입력 → 완성.",
    },
    {
        title: "검증된 전환",
        body: "실제 운영 데이터 기반 LP 패턴. 4→2 Step·컴팩트·신뢰 요소 내장.",
    },
    {
        title: "DB 자동 관리",
        body: "신청 데이터 자동 수집 + 시트 분배 + 텔레그램 알림.",
    },
];

const INDUSTRIES = [
    {
        id: "debt",
        name: "개인회생·파산",
        description: "채무 해결 상담 신청 LP. 4단계 자가진단 내장.",
        status: "ACTIVE" as const,
        sampleHref: "https://otpage1.com/select1",
    },
    {
        id: "rental",
        name: "정수기·렌탈",
        description: "렌탈 상품 문의 신청 LP.",
        status: "PLACEHOLDER" as const,
    },
    {
        id: "broadband",
        name: "인터넷·통신",
        description: "통신 결합 상품 신청 LP.",
        status: "PLACEHOLDER" as const,
    },
    {
        id: "invest",
        name: "주식·투자",
        description: "투자 리드 수집 LP.",
        status: "PLACEHOLDER" as const,
    },
    {
        id: "realestate",
        name: "부동산·임대",
        description: "매매·임대 상담 신청 LP.",
        status: "PLACEHOLDER" as const,
    },
    {
        id: "medical",
        name: "의료·병원",
        description: "진료 예약 및 상담 신청 LP.",
        status: "PLACEHOLDER" as const,
    },
];

const COMPARISONS = [
    {
        without: "외주 제작 — ₩수십만 + 2주 대기",
        with: "OT 구독 — 5분 + 월정액",
    },
    {
        without: "일반 폼 빌더 — 전환 최적화 X",
        with: "OT LP — 업종별 검증된 전환 패턴",
    },
    {
        without: "DB 수동 관리 — 엑셀 복붙",
        with: "OT — 자동 수집·분배·텔레그램 알림",
    },
];

const FAQ_ITEMS = [
    {
        q: "구독료는 얼마인가요?",
        a: "요금제 페이지에서 확인하세요. 업종·기능별 플랜을 준비 중입니다.",
    },
    {
        q: "코딩을 몰라도 되나요?",
        a: "네. 업종 선택 + 브랜드 정보 입력만 하면 됩니다. 코딩 지식 불필요.",
    },
    {
        q: "내 도메인을 연결할 수 있나요?",
        a: "기본은 One Trillion 제공 도메인 사용. 커스텀 도메인 연결은 추후 지원 예정.",
    },
    {
        q: "DB는 어디에 저장되나요?",
        a: "구글 시트에 자동 저장 + 텔레그램 즉시 알림. 별도 서버 관리 불필요.",
    },
    {
        q: "해지하면 어떻게 되나요?",
        a: "해지 즉시 랜딩페이지 비활성화. 수집된 DB 데이터는 시트에 그대로 보존.",
    },
];

export default function LandingPagesPage() {
    return (
        <>
            {/* Hero */}
            <Section variant="white" size="xl" className="pt-24 md:pt-32">
                <div className="max-w-3xl mx-auto text-center">
                    <Badge variant="primary" className="mb-4">구독형 랜딩페이지</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-tight mt-3">
                        코딩 없이 5분,<br />업종별 검증된 랜딩페이지
                    </h1>
                    <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
                        DB 수집에 최적화된 랜딩페이지를 월 구독으로.<br />
                        개인회생·정수기·인터넷·주식·부동산·의료 — 업종별 검증된 전환 패턴.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-base transition-colors"
                        >
                            무료로 시작하기
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center px-8 py-3.5 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-semibold rounded-full text-base transition-colors"
                        >
                            요금제 보기
                        </Link>
                    </div>
                </div>
            </Section>

            {/* 핵심 가치 3개 */}
            <Section variant="muted" size="md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {VALUE_PROPS.map((v) => (
                        <Card key={v.title} className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5 text-primary-600" />
                                </div>
                                <h3 className="font-bold text-neutral-900">{v.title}</h3>
                            </div>
                            <p className="text-sm text-neutral-500 leading-relaxed">{v.body}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* 작동 방식 3단계 */}
            <Section variant="white" size="lg">
                <SectionHeader>
                    <SectionTitle>작동 방식</SectionTitle>
                    <SectionDescription>3단계로 끝납니다.</SectionDescription>
                </SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            step: "01",
                            title: "업종 선택",
                            body: "6개 업종 중 원하는 업종을 선택하세요.",
                        },
                        {
                            step: "02",
                            title: "정보 입력",
                            body: "브랜드명·연락처·질문 항목을 입력하면 자동 완성.",
                        },
                        {
                            step: "03",
                            title: "발행 + DB 수집",
                            body: "링크를 공유하면 신청 데이터가 자동 수집됩니다.",
                        },
                    ].map((item) => (
                        <div key={item.step} className="flex flex-col gap-3">
                            <span className="text-4xl font-bold text-primary-100">{item.step}</span>
                            <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{item.body}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* 업종별 LP 샘플 갤러리 */}
            <Section variant="muted" size="lg">
                <SectionHeader>
                    <SectionTitle>6개 업종 LP 샘플</SectionTitle>
                    <SectionDescription>
                        각 업종별로 검증된 전환 패턴이 적용된 랜딩페이지입니다.
                    </SectionDescription>
                </SectionHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {INDUSTRIES.map((industry) => (
                        <Card key={industry.id} className="p-5 flex flex-col gap-3">
                            <div className="flex items-start justify-between">
                                <h3 className="font-bold text-neutral-900">{industry.name}</h3>
                                {industry.status === "ACTIVE" ? (
                                    <Badge variant="success">운영 중</Badge>
                                ) : (
                                    <Badge variant="neutral">준비 중</Badge>
                                )}
                            </div>
                            <p className="text-sm text-neutral-500 flex-1">{industry.description}</p>
                            {industry.status === "ACTIVE" && industry.sampleHref ? (
                                <a
                                    href={industry.sampleHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                                >
                                    샘플 보기 <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            ) : (
                                <span className="text-sm text-neutral-400">곧 추가됩니다</span>
                            )}
                        </Card>
                    ))}
                </div>
            </Section>

            {/* 가치 비교 */}
            <Section variant="white" size="lg">
                <SectionHeader>
                    <SectionTitle>왜 OT 구독형 랜딩페이지인가</SectionTitle>
                </SectionHeader>
                <div className="max-w-2xl mx-auto space-y-4">
                    {COMPARISONS.map((c, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-neutral-200"
                        >
                            <div className="bg-neutral-50 px-5 py-4 flex items-center gap-3">
                                <span className="w-4 h-4 rounded-full bg-neutral-300 shrink-0" />
                                <span className="text-sm text-neutral-500">{c.without}</span>
                            </div>
                            <div className="bg-primary-50 px-5 py-4 flex items-center gap-3">
                                <Check className="w-4 h-4 text-primary-500 shrink-0" />
                                <span className="text-sm font-semibold text-primary-700">{c.with}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* FAQ */}
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

            {/* 하단 구독 CTA */}
            <Section variant="primary" size="lg">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary-900 tracking-tight">
                        지금 시작하면<br />첫 랜딩페이지를 무료로 만들어볼 수 있어요
                    </h2>
                    <p className="mt-4 text-base text-primary-700">
                        회원가입만 하면 바로 시작. 카드 정보 불필요.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-base transition-colors"
                        >
                            무료로 시작하기
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center px-8 py-3.5 border border-primary-300 text-primary-700 hover:bg-primary-100 font-semibold rounded-full text-base transition-colors"
                        >
                            요금제 자세히 보기
                        </Link>
                    </div>
                </div>
            </Section>
        </>
    );
}
