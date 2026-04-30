import Link from "next/link";
import { ArrowRight, ShieldCheck, Layers, Lock, Database } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const services = [
    {
        num: "01",
        icon: ShieldCheck,
        title: "업종별 법규 가드레일 시스템",
        desc: "업종별 사용 가능/금지 표현을 시트에 박아두고 광고 카피 자동 검증. 광고주의 업종별 인허가·등록 자격 매칭하여 \"전문\"·\"보장\" 등 민감 표현 사용 가능 여부 카피 단계에서 자동 제어.",
        kicker: "위반 카피 1건도 안 나옴 → 광고주 법적 리스크 차단",
        linkHref: "/#guardrail",
        linkText: "가드레일 자세히",
    },
    {
        num: "02",
        icon: Layers,
        title: "업종별 자가진단 + 등급·유형 자동 분기",
        desc: "랜딩페이지에서 신청자가 업종별 자가진단에 답변하면 시스템이 점수·조건을 계산해 등급 또는 가입 유형으로 자동 분류. 광고주·콜팀이 1차콜 직전 시트 1줄만 보고 우선순위 판단 가능.",
        kicker: "개인회생 = A·B·C / 핸드폰 = MNP·신규·기변·MVNO / 그 외 업종도 동일 패턴",
        linkHref: "/#industries",
        linkText: "업종별 패턴 보기",
    },
    {
        num: "03",
        icon: Lock,
        title: "광고주 명의 100% 분리 운영",
        desc: "광고에 OT 브랜드 0% 노출. 광고주별 브랜드 슬러그 URL (예: otpage.com/brand-abc) + 상호·사업자번호·광고책임자·업종별 의무 표기 사항 자동 표기.",
        kicker: "업종별 광고법 (변호사법 §24의2 / 의료법 §56 / 표시광고법 §3 등) 의무 표기 자동 준수",
        linkHref: "/#cpa-model",
        linkText: "운영 모델 보기",
    },
    {
        num: "04",
        icon: Database,
        title: "업종별 풀 데이터 시트 + 텔레그램 즉시 알림",
        desc: "랜딩 폼 제출 즉시 업종별 풀 컬럼 구글 시트 + 텔레그램 동시 전송 (병렬 처리). 광고주가 1차콜에서 떨어뜨려도 시트에 다 남음. 진성 DB 누락 0.",
        kicker: "광고주 시트 보기 권한 부여 (편집 X) → 투명한 운영",
        linkHref: "/#contact",
        linkText: "운영 문의",
    },
];

export function WhatWeBring() {
    return (
        <section id="what-we-bring" className="py-24 md:py-32 bg-white lg:min-h-[85vh] lg:flex lg:items-center">
            <div className="ot-container">
                <FadeInUp className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <div className="eyebrow mb-4">SERVICES</div>
                    <h2
                        className="font-display text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.25]"
                        style={{ textWrap: "balance" }}
                    >
                        다른 CPA 대행과의 <span className="text-gradient-coral font-semibold">4가지 차이</span>
                    </h2>
                    <p className="text-base md:text-lg text-[var(--slate-600)] leading-relaxed">
                        OT MARKETING 의 운영 시스템은 광고주가 안심하고 본업에만 집중할 수 있도록
                        <br className="hidden md:block" />
                        법규·등급 분기·명의 분리·데이터 추적까지 자동화되어 있습니다.
                    </p>
                </FadeInUp>

                <StaggerContainer
                    stagger={0.1}
                    delayChildren={0.1}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto"
                >
                    {services.map((item) => (
                        <StaggerItem key={item.num}>
                            <div className="group relative bg-white rounded-xl border border-[var(--slate-200)] shadow-sm p-7 md:p-8 lg:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--coral-400)] h-full flex flex-col">
                                {/* 좌측 강조 라인 (hover 시 등장) */}
                                <div className="absolute left-0 top-6 bottom-6 w-1 bg-[var(--coral-500)] rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="flex items-center gap-4 mb-5">
                                    <div className="font-display text-5xl md:text-6xl font-semibold text-gradient-coral leading-none">
                                        {item.num}
                                    </div>
                                    <div className="w-12 h-12 rounded-lg bg-[var(--coral-50)] flex items-center justify-center text-[var(--coral-500)] flex-shrink-0">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                </div>

                                <h3 className="text-xl md:text-2xl lg:text-lg font-bold text-[var(--navy)] mb-3 leading-snug">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-[var(--slate-600)] leading-relaxed mb-5">
                                    {item.desc}
                                </p>

                                <p className="text-sm font-bold text-[var(--coral-600)] mb-6 pl-4 border-l-2 border-[var(--coral-400)]/60">
                                    → {item.kicker}
                                </p>

                                <Link
                                    href={item.linkHref}
                                    className="inline-flex items-center gap-2 text-[var(--navy)] hover:text-[var(--coral-500)] font-bold text-sm group/link transition-colors mt-auto"
                                >
                                    {item.linkText}
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
