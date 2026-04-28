import Link from "next/link";
import { ArrowRight, ShieldCheck, Layers, Lock, Database } from "lucide-react";

const services = [
    {
        num: "01",
        icon: ShieldCheck,
        title: "업종별 법규 가드레일 시스템",
        desc: "업종별 사용 가능/금지 표현을 시트에 박아두고 광고 카피 자동 검증. 광고주의 업종별 인허가·등록 자격 매칭하여 \"전문\"·\"보장\" 등 민감 표현 사용 가능 여부 카피 단계에서 자동 제어.",
        kicker: "위반 카피 1건도 안 나옴 → 광고주 형사 책임 차단",
        linkHref: "/#guardrail",
        linkText: "가드레일 자세히",
    },
    {
        num: "02",
        icon: Layers,
        title: "9문항 자가진단 + A/B/C 등급 자동 분기",
        desc: "랜딩페이지에서 신청자가 9문항 자가진단을 답변하면 시스템이 점수 계산 후 등급 자동 분류. 변호사·콜팀이 1차콜 직전 시트 1줄만 보고 신청 가능 여부 판단 가능.",
        kicker: "A: 즉시 콜 / B: 검토 후 콜 / C: 다른 절차 안내",
        linkHref: "/showcase",
        linkText: "자가진단 시안 보기",
    },
    {
        num: "03",
        icon: Lock,
        title: "광고주 명의 100% 분리 운영",
        desc: "광고에 OT 브랜드 0% 노출. 광고주별 브랜드 슬러그 URL (예: otpage.com/lawfirm-abc) + 광고주명·법인명·사업자번호·광고책임 변호사 자동 표기.",
        kicker: "변호사법 §24의2 ② (광고책임 변호사 명시 의무) 자동 준수",
        linkHref: "/#cpa-model",
        linkText: "운영 모델 보기",
    },
    {
        num: "04",
        icon: Database,
        title: "17 컬럼 풀 데이터 + 텔레그램 즉시 알림",
        desc: "랜딩 폼 제출 즉시 구글 시트 17 컬럼 + 텔레그램 동시 전송 (병렬 처리). 광고주가 1차콜에서 떨어뜨려도 시트에 다 남음. 진성 DB 누락 0.",
        kicker: "광고주 시트 보기 권한 부여 (편집 X) → 투명한 운영",
        linkHref: "/#contact",
        linkText: "운영 문의",
    },
];

export function WhatWeBring() {
    return (
        <section id="what-we-bring" className="py-24 md:py-32 bg-white">
            <div className="ot-container">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="eyebrow mb-4">SERVICES</div>
                    <h2
                        className="font-serif text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.3]"
                        style={{ textWrap: "balance" }}
                    >
                        다른 CPA 대행과의 <span className="text-[var(--gold)]">4가지 차이</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        OT MARKETING 의 운영 시스템은 광고주가 안심하고 본업에만 집중할 수 있도록
                        <br className="hidden md:block" />
                        법규·등급 분기·명의 분리·데이터 추적까지 자동화되어 있습니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 max-w-5xl mx-auto">
                    {services.map((item, idx) => (
                        <div
                            key={idx}
                            className="border-t-2 border-[var(--gold)] pt-6"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="font-serif text-5xl text-[var(--gold)] leading-none">
                                    {item.num}
                                </div>
                                <item.icon className="w-7 h-7 text-[var(--gold-dark)]" />
                            </div>
                            <h3 className="font-serif text-2xl text-[var(--navy)] mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {item.desc}
                            </p>
                            <p className="text-sm font-bold text-[var(--gold-dark)] mb-5 pl-4 border-l-2 border-[var(--gold)]/40">
                                → {item.kicker}
                            </p>
                            <Link
                                href={item.linkHref}
                                className="inline-flex items-center gap-2 text-[var(--navy)] hover:text-[var(--gold)] font-semibold text-sm border-b border-[var(--gold)] pb-0.5 transition-colors"
                            >
                                {item.linkText}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
