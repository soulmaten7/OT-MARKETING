import { ShieldCheck, AlertTriangle } from "lucide-react";

const industryGuardrails = [
    {
        name: "정수기·렌탈",
        law: "표시광고법 · 할부거래법",
        forbidden: '"업계 최저가" · "최고 품질"',
        allowed: '"동급 대비 합리적 가격"',
    },
    {
        name: "인터넷·통신·휴대폰",
        law: "전기통신사업법 · 표시광고법",
        forbidden: '"최고 속도 보장" · "최저가 1위"',
        allowed: '"기가 인터넷 안내" · "결합 할인 정보"',
    },
    {
        name: "부동산·분양",
        law: "공인중개사법 · 부동산광고 표시법",
        forbidden: '"확정 시세차익" · "투자 수익 보장"',
        allowed: '"분양 일정·청약 자격 안내"',
    },
    {
        name: "주식·투자",
        law: "자본시장법 · 유사수신행위 규제법",
        forbidden: '"수익률 보장" · "100% 수익"',
        allowed: '"투자 정보 제공" · "분석 자료 안내"',
    },
    {
        name: "병의원",
        law: "의료법 §56 · 의료광고 사전심의",
        forbidden: '"효과 100% 보장" · 환자 후기 사진',
        allowed: '"사전 상담 안내" · 절차 설명',
    },
    {
        name: "개인회생·법률",
        law: "변호사법 §24의2 · 광고규정 §3·§4",
        forbidden: '"100% 면책" · "확실한 면책"',
        allowed: '"개인회생 신청 가능성 검토"',
    },
];

const penalties = [
    "표시광고법 §17: 시정명령 + 매출 2% 이하 과징금 (모든 업종 공통)",
    "전기통신사업법: 시정명령 + 과태료 (반복 시 영업정지)",
    "공인중개사법: 자격 취소 / 1년 이하 징역",
    "자본시장법·유사수신: 무인가 영업 5년 이하 / 유사수신 5년 이하 징역",
    "의료법 §56·§89: 의료광고 위반 시 1년 이하 징역 또는 1천만원 이하 벌금",
    "변호사법 §117: 1억원 이하 과태료 / 협회 징계 / 반복·중대 시 형사 송치",
];

export function Guardrail() {
    return (
        <section id="guardrail" className="py-24 md:py-32 bg-[var(--secondary)]">
            <div className="ot-container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="eyebrow mb-4">LEGAL GUARDRAIL</div>
                    <h2
                        className="font-serif text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.3]"
                        style={{ textWrap: "balance" }}
                    >
                        광고주 <span className="text-[var(--gold)]">법적 리스크 차단</span> 시스템
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        6 업종별 인허가·표시광고법·매체 정책을 시트에 박아두고 광고 카피 자동 검증.
                        <br className="hidden md:block" />
                        위반 표현은 카피 단계에서 자동 차단되어 광고주에게 전달되지 않습니다.
                    </p>
                </div>

                {/* 시스템 작동 방식 */}
                <div className="max-w-5xl mx-auto bg-white rounded-md border border-gray-200 p-6 md:p-8 mb-10">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-md bg-[var(--gold-10)] flex items-center justify-center text-[var(--gold)] flex-shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-serif text-xl text-[var(--navy)] font-bold mb-2">
                                3단계 자동 검증 시스템
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                ① 업종별 법규 가이드 시트 → ② 광고주 등록 자격·전문분야 매칭 → ③ 카피 자동 검증
                            </p>
                        </div>
                    </div>
                </div>

                {/* 6 업종 가드레일 그리드 */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    {industryGuardrails.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-md border border-gray-200 p-6 flex flex-col"
                        >
                            <h4 className="font-serif text-lg text-[var(--navy)] font-bold mb-2">
                                {item.name}
                            </h4>
                            <div className="text-xs text-[var(--gold-dark)] font-semibold mb-4 pb-3 border-b border-gray-100">
                                ⚖ {item.law}
                            </div>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <div className="text-xs font-bold text-red-700 mb-1">✗ 금지 표현</div>
                                    <p className="text-gray-700 leading-relaxed">{item.forbidden}</p>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-emerald-700 mb-1">✓ 사용 가능</div>
                                    <p className="text-gray-700 leading-relaxed">{item.allowed}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 처벌 수준 — 보편 (6 업종 합산) */}
                <div className="max-w-6xl mx-auto bg-amber-50 border-l-4 border-amber-500 rounded-md p-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-900 leading-relaxed">
                            <strong className="block mb-3 text-amber-950">위반 시 광고주 처벌 수준 (업종별 핵심 법령)</strong>
                            <ul className="space-y-1.5 mb-3">
                                {penalties.map((p, i) => (
                                    <li key={i} className="pl-3 relative">
                                        <span className="absolute left-0 text-amber-700">•</span>
                                        {p}
                                    </li>
                                ))}
                            </ul>
                            <strong className="block mt-2">→ 카피 1건이라도 위반 시 광고주 본인 책임. OT 시스템이 사전 차단해 광고주를 보호합니다.</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
