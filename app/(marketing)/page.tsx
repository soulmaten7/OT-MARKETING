import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const FEATURES = [
    {
        id: "landing",
        image: "/images/home/feature-landing.png",
        imageAlt: "구독형 랜딩페이지 서비스 화면",
        title: "구독형 랜딩페이지",
        description: "업종별 검증된 랜딩페이지를 월 구독으로.",
        benefits: [
            "코딩 없이 5분 만에 완성",
            "업종별 검증된 전환 패턴",
            "DB 자동 수집·관리",
        ],
        cta: "랜딩페이지 시작하기",
        href: "/landing-pages",
        badge: null as string | null,
    },
    {
        id: "cpa",
        image: "/images/home/feature-cpa.png",
        imageAlt: "CPA 광고 서비스 화면",
        title: "CPA 광고",
        description: "검증된 광고 인프라로 실제 DB를 받아보세요.",
        benefits: [
            "광고 소재부터 정산까지 한 번에",
            "실제 전환 데이터 기반 운영",
            "업종별 맞춤 타겟팅",
        ],
        cta: "CPA 광고 문의하기",
        href: "/cpa",
        badge: null as string | null,
    },
    {
        id: "blog-sms",
        image: "/images/home/feature-blog-sms.png",
        imageAlt: "문자문의 만들기 서비스 화면",
        title: "문자문의 만들기",
        description: "블로그·SNS·명함 어디에든 문의 버튼을.",
        benefits: [
            "블로그·SNS·명함 어디에든 문의 버튼 배치",
            "14개 업종별 메시지 템플릿 제공",
            "방문자가 누르면 문자 문의 자동 작성",
        ],
        cta: "무료로 시작하기",
        href: "/blog-sms",
        badge: "무료",
    },
];

export default function Home() {
    return (
        <Section variant="muted" size="lg" className="pt-24 md:pt-28">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
                    마케팅에 필요한 도구, 한 곳에
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FEATURES.map((feature) => (
                    <Link key={feature.id} href={feature.href} className="h-full flex">
                        <Card clickable className="h-full flex flex-col w-full overflow-hidden">
                            {/* 상단 이미지 영역 */}
                            <div className="relative aspect-[3/2] bg-neutral-100 overflow-hidden">
                                <Image
                                    src={feature.image}
                                    alt={feature.imageAlt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority
                                />
                            </div>

                            {/* 하단 텍스트 영역 */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-lg font-bold text-neutral-900">
                                        {feature.title}
                                    </h3>
                                    {feature.badge && (
                                        <Badge variant="success">{feature.badge}</Badge>
                                    )}
                                </div>

                                <p className="text-sm text-neutral-500 mb-4">
                                    {feature.description}
                                </p>

                                <ul className="flex-1 space-y-2.5 mb-6">
                                    {feature.benefits.map((benefit) => (
                                        <li key={benefit} className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                                            <span className="text-sm text-neutral-700">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>

                                <span className="text-primary-500 font-semibold text-sm">
                                    {feature.cta} →
                                </span>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </Section>
    );
}
