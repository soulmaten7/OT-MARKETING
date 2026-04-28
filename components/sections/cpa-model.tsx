import Link from "next/link";
import { ArrowRight, Receipt, Coins } from "lucide-react";

export function CpaModel() {
    return (
        <section id="cpa-model" className="py-24 md:py-32 bg-white">
            <div className="ot-container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="eyebrow mb-4">CPA SETTLEMENT</div>
                    <h2
                        className="font-serif text-3xl md:text-5xl text-[var(--navy)] mb-6 leading-[1.3]"
                        style={{ textWrap: "balance" }}
                    >
                        CPA 정산 모델 <span className="text-[var(--gold)]">2가지 + 결제 옵션</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        광고주 운영 자원·콜 인력 상황에 따라 모델 선택.
                        <br className="hidden md:block" />
                        결제는 세금계산서·코인 모두 가능합니다.
                    </p>
                </div>

                {/* 모델 A vs B */}
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
                    {/* 모델 A */}
                    <div className="bg-white border border-gray-200 rounded-md p-8">
                        <h3 className="font-serif text-2xl text-[var(--navy)] font-bold mb-1">
                            모델 A — 1차콜 미포함
                        </h3>
                        <p className="text-sm text-gray-500 mb-5">DB 만 전달 · 광고주 인하우스 콜팀 운영</p>
                        <div className="font-serif text-xl text-[var(--gold-dark)] font-bold mb-1">
                            단가 합리적
                        </div>
                        <p className="text-xs text-gray-500 mb-6">/ 유효 DB 1건</p>
                        <ul className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                            <li className="text-sm text-gray-700 pl-5 relative">
                                <span className="absolute left-0 text-[var(--gold)] font-bold">✓</span>
                                업종별 자가진단 + 등급·유형 + 연락처 풀 데이터
                            </li>
                            <li className="text-sm text-gray-700 pl-5 relative">
                                <span className="absolute left-0 text-[var(--gold)] font-bold">✓</span>
                                구글시트 + 텔레그램 동시 전달
                            </li>
                            <li className="text-sm text-gray-700 pl-5 relative">
                                <span className="absolute left-0 text-[var(--gold)] font-bold">✓</span>
                                광고주 콜팀이 직접 1차 응대
                            </li>
                            <li className="text-sm text-gray-700 pl-5 relative">
                                <span className="absolute left-0 text-[var(--gold)] font-bold">✓</span>
                                콜팀 운영 가능한 중·대형 사업장 적합
                            </li>
                        </ul>
                    </div>

                    {/* 모델 B (featured) */}
                    <div className="bg-white border-2 border-[var(--gold)] rounded-md p-8 relative shadow-lg">
                        <div className="absolute -top-3 right-6 bg-[var(--gold)] text-[var(--navy)] text-xs font-bold px-3 py-1 rounded">
                            추천
                        </div>
                        <h3 className="font-serif text-2xl text-[var(--navy)] font-bold mb-1">
                            모델 B — 1차콜 포함
                        </h3>
                        <p className="text-sm text-gray-500 mb-5">유효 상담 1건 = 고객 미팅 · 상담 약속까지</p>
                        <div className="font-serif text-xl text-[var(--gold-dark)] font-bold mb-1">
                            단가 ↑↑ <span className="text-sm font-normal text-gray-500">(모델 A 대비 상위)</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6">/ 미팅 확정 1건</p>
                        <ul className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                            <li className="text-sm text-gray-700 pl-5 relative">
                                <span className="absolute left-0 text-[var(--gold)] font-bold">✓</span>
                                광고주가 콜 스크립트 제공 또는 핵심 응대 내용 전달
                            </li>
                            <li className="text-sm text-gray-700 pl-5 relative">
                                <span className="absolute left-0 text-[var(--gold)] font-bold">✓</span>
                                실수요 검증 + 미팅 일정 확정
                            </li>
                            <li className="text-sm text-gray-700 pl-5 relative">
                                <span className="absolute left-0 text-[var(--gold)] font-bold">✓</span>
                                확정된 검증 건만 광고주에게 전달
                            </li>
                            <li className="text-sm text-gray-700 pl-5 relative">
                                <span className="absolute left-0 text-[var(--gold)] font-bold">✓</span>
                                1인·소형 사업자 적합
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 결제 옵션 */}
                <div className="max-w-5xl mx-auto bg-[var(--secondary)] rounded-md p-6 md:p-8 mb-6">
                    <div className="text-xs font-bold text-[var(--gold-dark)] tracking-widest mb-4">
                        PAYMENT OPTIONS · 결제 옵션
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <Receipt className="w-6 h-6 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                            <div>
                                <strong className="block text-[var(--navy)] mb-0.5">세금계산서 발행 가능</strong>
                                <span className="text-sm text-gray-600">법인·사업자 광고주 표준. 부가세 포함 견적 발행.</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Coins className="w-6 h-6 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                            <div>
                                <strong className="block text-[var(--navy)] mb-0.5">코인 결제 가능</strong>
                                <span className="text-sm text-gray-600">USDT·BTC·ETH 등. <strong>코인 결제 시 세금계산서 발행 불가.</strong></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 안내 문구 */}
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        ※ <strong className="text-[var(--navy)]">최종 단가 · 정산 주기 · 결제 조건은 모두 계약 단계에서 광고주와 직접 조율</strong>해 확정합니다.<br />
                        (업종 · 물량 · 기간 · 1차콜 포함 여부에 따라 변동)
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 bg-[var(--navy)] hover:bg-[var(--navy-80)] text-white px-6 py-3 rounded text-sm font-bold transition-colors"
                        >
                            모델 상담 받기
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
