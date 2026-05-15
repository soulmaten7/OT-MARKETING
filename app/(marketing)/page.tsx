"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Link2, BadgeCheck, ShieldCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/Badge";

// STEP_110 — 홈 히어로 v2: 3행 풀와이드 카드 + 비주얼 + 애니메이션

type Feature = {
    id: string;
    reverse: boolean;
    heroImage: string;
    imageAlt: string;
    title: string;
    description: string;
    benefits: string[];
    cta: string;
    href: string;
    badge: string | null;
};

const FEATURES: Feature[] = [
    {
        id: "landing",
        reverse: false,
        heroImage: "/images/home/hero-landing.png",
        imageAlt: "구독형 랜딩페이지 서비스 화면",
        title: "구독형 랜딩페이지",
        description: "코딩 없이 5분, 업종별 검증된 랜딩페이지를 월 구독으로.",
        benefits: [
            "코딩 없이 5분 만에 완성",
            "업종별 검증된 전환 패턴",
            "DB 자동 수집·관리",
        ],
        cta: "구독형 랜딩페이지 시작하기",
        href: "/landing-pages",
        badge: null,
    },
    {
        id: "cpa",
        reverse: true,
        heroImage: "/images/home/hero-cpa.png",
        imageAlt: "CPA 광고 서비스 화면",
        title: "CPA 광고",
        description: "검증된 광고 인프라로 실제 DB를. 성과 난 만큼만 정산.",
        benefits: [
            "광고 소재부터 정산까지 한 번에",
            "실제 전환 데이터 기반 운영",
            "업종별 맞춤 타겟팅",
        ],
        cta: "CPA 광고 문의하기",
        href: "/cpa",
        badge: null,
    },
    {
        id: "blog-sms",
        reverse: false,
        heroImage: "/images/home/hero-blog-sms.png",
        imageAlt: "문자문의 만들기 서비스 화면",
        title: "문자문의 만들기",
        description: "블로그·SNS·명함 어디에든 문의 버튼을. 누르면 문자 문의 자동 작성.",
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

const WHY_ITEMS = [
    {
        Icon: Link2,
        title: "한 계정에서 전부",
        body: "문자문의 → 구독형 랜딩페이지 → CPA 광고. 마케팅 도구를 따로따로 쓰지 마세요.",
    },
    {
        Icon: BadgeCheck,
        title: "업종별 검증된 패턴",
        body: "개인회생·정수기·인터넷·주식·부동산·병의원. 6 업종 전환 데이터 기반 설계.",
    },
    {
        Icon: ShieldCheck,
        title: "광고주 명의 100%",
        body: "OT 브랜드 노출 0%. 모든 랜딩과 광고는 광고주 명의·번호로 운영됩니다.",
    },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
    const immediate = index === 0;
    const imgRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imgInView = useInView(imgRef, { once: true, margin: "-80px" });
    const textInView = useInView(textRef, { once: true, margin: "-80px" });

    const bgClass = index % 2 === 0 ? "bg-white" : "bg-neutral-50";

    return (
        <section className={`py-16 md:py-24 ${bgClass}`}>
            <div className="max-w-6xl mx-auto px-6">
                <div className={`flex flex-col ${feature.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-10 md:gap-16 items-center`}>

                    {/* 비주얼 영역 — 16:9 */}
                    <motion.div
                        ref={imgRef}
                        className="w-full md:w-1/2 relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 shadow-lg"
                        initial={{ opacity: 0, x: feature.reverse ? 48 : -48 }}
                        animate={immediate || imgInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease }}
                    >
                        <Image
                            src={feature.heroImage}
                            alt={feature.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index === 0}
                        />
                    </motion.div>

                    {/* 텍스트 영역 — HTML (이미지 밖) */}
                    <motion.div
                        ref={textRef}
                        className="w-full md:w-1/2"
                        initial={{ opacity: 0, x: feature.reverse ? -48 : 48 }}
                        animate={immediate || textInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.12, ease }}
                    >
                        {feature.badge && (
                            <div className="mb-4">
                                <Badge variant="success">{feature.badge}</Badge>
                            </div>
                        )}
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
                            {feature.title}
                        </h2>
                        <p className="text-base md:text-lg text-neutral-500 mb-6 leading-relaxed">
                            {feature.description}
                        </p>
                        <ul className="space-y-3 mb-8">
                            {feature.benefits.map((benefit) => (
                                <li key={benefit} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                                    <span className="text-neutral-700">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={feature.href}
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full transition-colors"
                        >
                            {feature.cta}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function WhyCard({ item, index }: { item: (typeof WHY_ITEMS)[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            className="bg-white rounded-2xl p-7 shadow-sm border border-neutral-200"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12, ease }}
        >
            <div className="mb-4">
                <item.Icon className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">{item.title}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">{item.body}</p>
        </motion.div>
    );
}

function CtaSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <section className="py-20 md:py-28 bg-primary-500">
            <motion.div
                ref={ref}
                className="max-w-2xl mx-auto px-6 text-center"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    지금 무료로 시작하세요
                </h2>
                <p className="mt-4 text-base text-primary-100">
                    문자문의 만들기는 완전 무료 — 가입만 하면 바로
                </p>
                <Link
                    href="/signup"
                    className="mt-8 inline-flex items-center justify-center px-10 py-4 bg-white text-primary-600 font-bold rounded-full text-base hover:bg-primary-50 transition-colors"
                >
                    무료로 시작하기
                </Link>
            </motion.div>
        </section>
    );
}

export default function Home() {
    return (
        <main className="bg-white overflow-x-hidden">
            {/* Hero */}
            <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-neutral-50">
                <motion.div
                    className="max-w-4xl mx-auto px-6 text-center"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight">
                        마케팅에 필요한 도구,<br />한 곳에
                    </h1>
                    <p className="mt-5 text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                        문자문의 만들기 · 구독형 랜딩페이지 · CPA 광고.<br className="hidden sm:block" />
                        세 가지 도구가 한 계정에서.
                    </p>
                </motion.div>
            </section>

            {/* 3행 풀와이드 카드 */}
            <div>
                {FEATURES.map((feature, i) => (
                    <FeatureRow key={feature.id} feature={feature} index={i} />
                ))}
            </div>

            {/* 왜 OT */}
            <section className="py-20 md:py-28 bg-neutral-50">
                <div className="max-w-5xl mx-auto px-6">
                    <WhySectionHeader />
                    <div className="grid md:grid-cols-3 gap-8">
                        {WHY_ITEMS.map((item, i) => (
                            <WhyCard key={item.title} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 최종 CTA */}
            <CtaSection />
        </main>
    );
}

function WhySectionHeader() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
        >
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                마케팅 도구, 따로따로 쓰지 마세요
            </h2>
            <p className="mt-3 text-base text-neutral-500">
                OT MARKETING 하나로 콘텐츠 → 랜딩 → DB 수집까지
            </p>
        </motion.div>
    );
}
