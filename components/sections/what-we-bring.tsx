import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
    {
        num: "01",
        title: "업종별 랜딩페이지 제작",
        desc: "신뢰·액션·케어·미니멀·다크·비비드 디자인 시스템. 업종 특성·법적 규제에 맞춰 광고주 브랜드로 맞춤 제작합니다.",
        linkHref: "/showcase",
        linkText: "포트폴리오 보기",
    },
    {
        num: "02",
        title: "광고 매체 운영",
        desc: "메타·구글·당근 CPA 광고를 업종 특성에 맞춰 집행합니다. 소재·타겟·예산 최적화까지 전담.",
        linkHref: "/#contact",
        linkText: "운영 문의",
    },
    {
        num: "03",
        title: "검증된 DB 전달",
        desc: "수집된 리드는 중복·무효 필터링 후 실시간 전달. 업종별 유효 기준을 사전에 명문화합니다.",
        linkHref: "/#contact",
        linkText: "유효 기준 문의",
    },
    {
        num: "04",
        title: "투명한 CPA 정산",
        desc: "단가·정산 주기·유효 리드 기준을 사전 합의. 매주 성과 리포트와 함께 정산 내역을 투명하게 공유합니다.",
        linkHref: "/#contact",
        linkText: "단가 문의",
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
                        랜딩 제작부터 <span className="text-[var(--gold)]">CPA 정산</span>까지
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        OT MARKETING 은 업종별 맞춤 랜딩페이지로 검증된 DB를 수집하고,
                        <br className="hidden md:block" />
                        사전 합의된 CPA 단가로 투명하게 정산합니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 max-w-5xl mx-auto">
                    {services.map((item, idx) => (
                        <div
                            key={idx}
                            className="border-t-2 border-[var(--gold)] pt-6"
                        >
                            <div className="font-serif text-5xl text-[var(--gold)] mb-3 leading-none">
                                {item.num}
                            </div>
                            <h3 className="font-serif text-2xl text-[var(--navy)] mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-5">
                                {item.desc}
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
