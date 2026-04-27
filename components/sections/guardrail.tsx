import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const allowed = [
    "개인회생 신청 가능성 검토",
    "법원 절차 안내",
    "전담 변호사 (1:1 상담 시)",
    "무료 상담 (실제 무료 시)",
    "법적 절차 / 변제계획안 작성",
    "면책 가능성 (가능성 표현으로)",
];

const forbidden = [
    '"100% 면책" / "확실한 면책" — 확정 효과 표현 금지',
    '"최저가" / "최고" / "1위" — 부당비교 광고 금지',
    '"다른 법인보다 빠른" — 비교광고 금지',
    '"전문 변호사" — 협회 미등록 시 위반',
    '"성공보수 0원" — 단정 표현 금지',
    '의뢰인 추천사·실명 후기 — 광고규정 §4 위반',
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
                        광고주 <span className="text-[var(--gold)]">형사 책임 차단</span> 시스템
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        업종별 법규 가이드를 시트에 박아두고 광고 카피 자동 검증.
                        <br className="hidden md:block" />
                        위반 표현은 카피 단계에서 자동 차단되어 광고주에게 전달되지 않습니다.
                    </p>
                </div>

                {/* 시스템 작동 방식 */}
                <div className="max-w-5xl mx-auto bg-white rounded-md border border-gray-200 p-8 md:p-10 mb-10">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-md bg-[var(--gold-10)] flex items-center justify-center text-[var(--gold)] flex-shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-serif text-xl text-[var(--navy)] font-bold mb-2">
                                3단계 자동 검증 시스템
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                ① 업종별 법규 가이드 시트 → ② 광고주 등록 전문분야 매칭 → ③ 카피 자동 검증
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* 사용 가능 표현 */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-md p-5">
                            <div className="flex items-center gap-2 mb-4 text-emerald-700">
                                <CheckCircle2 className="w-5 h-5" />
                                <h4 className="font-bold text-sm">사용 가능 표현 (개인회생 예시)</h4>
                            </div>
                            <ul className="space-y-2">
                                {allowed.map((s, i) => (
                                    <li key={i} className="text-sm text-gray-700 leading-relaxed pl-4 relative">
                                        <span className="absolute left-0 text-emerald-600">✓</span>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 금지 표현 */}
                        <div className="bg-red-50 border border-red-200 rounded-md p-5">
                            <div className="flex items-center gap-2 mb-4 text-red-700">
                                <XCircle className="w-5 h-5" />
                                <h4 className="font-bold text-sm">금지 표현 (자동 차단)</h4>
                            </div>
                            <ul className="space-y-2">
                                {forbidden.map((s, i) => (
                                    <li key={i} className="text-sm text-gray-700 leading-relaxed pl-4 relative">
                                        <span className="absolute left-0 text-red-600">✗</span>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 처벌 수준 안내 */}
                <div className="max-w-5xl mx-auto bg-amber-50 border-l-4 border-amber-500 rounded-md p-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-900 leading-relaxed">
                            <strong className="block mb-1 text-amber-950">위반 시 광고주 처벌 수준 (변호사법 §117)</strong>
                            1억원 이하 과태료 / 협회 징계 (견책·과태료·정직·제명) / 반복·중대 시 검사 송치 → 형사.
                            표시광고법 위반: 시정명령 + 매출 2% 이하 과징금.
                            <strong className="block mt-2">→ 카피 1건이라도 위반 시 광고주 본인 책임. OT 시스템이 사전 차단해 광고주를 보호합니다.</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
