interface GuardrailFooterProps {
    law: string;
    forbidden: string[];
    allowed: string[];
    warning: string;
}

export function GuardrailFooter({ law, forbidden, allowed, warning }: GuardrailFooterProps) {
    return (
        <section className="py-12 md:py-16 bg-[var(--secondary)]">
            <div className="ot-container max-w-5xl">
                <div className="text-center mb-8">
                    <div className="text-xs font-bold tracking-widest text-[var(--gold-dark)] mb-2">
                        LEGAL GUARDRAIL
                    </div>
                    <h2 className="font-serif text-xl md:text-2xl text-[var(--navy)] font-bold mb-2">
                        ⚖ {law}
                    </h2>
                    <p className="text-xs text-gray-600">
                        본 페이지의 광고 표현은 업종 법규에 따라 자동 검증되어 박힙니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4">
                        <div className="text-xs font-bold text-emerald-700 mb-2">✓ 사용 가능 표현</div>
                        <ul className="space-y-1 text-xs text-gray-700">
                            {allowed.map((s, i) => (
                                <li key={i} className="pl-3 relative">
                                    <span className="absolute left-0 text-emerald-600">·</span>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="text-xs font-bold text-red-700 mb-2">✗ 자동 차단 표현</div>
                        <ul className="space-y-1 text-xs text-gray-700">
                            {forbidden.map((s, i) => (
                                <li key={i} className="pl-3 relative">
                                    <span className="absolute left-0 text-red-600">·</span>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-md p-4 text-xs text-amber-900">
                    <strong className="block mb-1 text-amber-950">처벌 수준</strong>
                    {warning}
                </div>
            </div>
        </section>
    );
}
