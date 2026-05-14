import Link from "next/link";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const FEATURES = [
    {
        id: "cpa",
        icon: "📊",
        title: "CPA 광고 신청",
        description: "검증된 광고 인프라로 실제 DB를 받아보세요. 광고 소재부터 랜딩·정산까지.",
        cta: "광고 신청하기",
        href: "/cpa",
        badge: null as string | null,
    },
    {
        id: "landing",
        icon: "🎯",
        title: "구독형 랜딩페이지",
        description: "업종별 검증된 랜딩페이지를 월 구독으로. 코딩 없이 5분 만에.",
        cta: "랜딩페이지 보기",
        href: "/landing-pages",
        badge: null as string | null,
    },
    {
        id: "blog-sms",
        icon: "✉️",
        title: "블로그문자",
        description: "블로그 콘텐츠 + 문자 자동화. 지금 무료로 시작하세요.",
        cta: "무료로 시작",
        href: "/blog-sms",
        badge: "무료",
    },
];

export default function Home() {
    return (
        <>
            {/* Hero */}
            <Section variant="white" size="xl" className="pt-28 md:pt-36">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                        광고주가 직접 운영하는<br />마케팅 인프라
                    </h1>
                    <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
                        DB 수집부터 랜딩페이지·블로그 자동화까지.<br />
                        OT MARKETING 한 곳에서 시작하세요.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-base transition-colors"
                        >
                            무료로 시작하기
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center px-8 py-3.5 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-semibold rounded-full text-base transition-colors"
                        >
                            로그인
                        </Link>
                    </div>
                </div>
            </Section>

            {/* 3 기능 카드 */}
            <Section variant="muted" size="lg">
                <SectionHeader>
                    <SectionTitle>3가지 마케팅 도구</SectionTitle>
                    <SectionDescription>
                        광고 신청부터 랜딩페이지·문자 자동화까지. 필요한 기능만 골라 쓰세요.
                    </SectionDescription>
                </SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {FEATURES.map((feature) => (
                        <Link key={feature.id} href={feature.href} className="h-full flex">
                            <Card clickable className="h-full flex flex-col w-full">
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="text-3xl">{feature.icon}</span>
                                        {feature.badge && (
                                            <Badge variant="success">{feature.badge}</Badge>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
                                    <p className="mt-2 text-sm text-neutral-500 flex-1">{feature.description}</p>
                                    <span className="mt-6 text-primary-500 font-semibold text-sm">
                                        {feature.cta} →
                                    </span>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Section>
        </>
    );
}
