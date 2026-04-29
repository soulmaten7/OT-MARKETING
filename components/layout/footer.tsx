import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[var(--navy-900)] text-white/80 py-16">
            <div className="ot-container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="font-display text-2xl tracking-tight text-white">
                            OT <span className="text-gradient-coral font-semibold">MARKETING</span>
                        </Link>
                        <p className="mt-4 text-sm text-white/60 max-w-sm leading-relaxed">
                            광고가 끝나는 자리까지 책임지는 CPA 인프라.<br />
                            6 업종 법규 가드레일 · 등급·유형 자동 분기 · 광고주 명의 분리.
                        </p>
                        <div className="mt-6 flex flex-col gap-2 text-sm text-white/70">
                            <p>Email · soulmaten7@gmail.com</p>
                            <p>
                                <a
                                    href="https://open.kakao.com/o/sw2Zxm9h"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[var(--coral-400)] transition-colors"
                                >
                                    💬 카카오톡 오픈채팅
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-[var(--coral-500)] text-xs tracking-widest font-bold mb-4">SERVICES</h4>
                        <ul className="text-sm text-white/70 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3">
                            <li><Link href="/#what-we-bring" className="hover:text-[var(--coral-400)] transition-colors">서비스 차별점</Link></li>
                            <li><Link href="/#how-it-works" className="hover:text-[var(--coral-400)] transition-colors">6단계 프로세스</Link></li>
                            <li><Link href="/#guardrail" className="hover:text-[var(--coral-400)] transition-colors">법규 가드레일</Link></li>
                            <li><Link href="/#cpa-model" className="hover:text-[var(--coral-400)] transition-colors">CPA 모델</Link></li>
                            <li><Link href="/#industries" className="hover:text-[var(--coral-400)] transition-colors">전문 업종</Link></li>
                            <li><Link href="/samples" className="hover:text-[var(--coral-400)] transition-colors">CPA 디자인 템플릿 6종</Link></li>
                            <li><Link href="/#contact" className="hover:text-[var(--coral-400)] transition-colors">광고주 문의</Link></li>
                        </ul>
                    </div>

                    {/* Legal + Admin */}
                    <div>
                        <h4 className="text-[var(--coral-500)] text-xs tracking-widest font-bold mb-4">LEGAL</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><Link href="/privacy" className="hover:text-[var(--coral-400)] transition-colors">개인정보처리방침</Link></li>
                            <li><Link href="/terms" className="hover:text-[var(--coral-400)] transition-colors">이용약관</Link></li>
                        </ul>

                        <h4 className="text-[var(--coral-500)] text-xs tracking-widest font-bold mt-8 mb-4">INTERNAL</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li>
                                <Link
                                    href="/admin/guide"
                                    prefetch={false}
                                    className="inline-flex items-center gap-1.5 hover:text-[var(--coral-400)] transition-colors"
                                >
                                    <span>🔒</span>
                                    <span>관리자 로그인</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 gap-4">
                    <p>© {new Date().getFullYear()} OT MARKETING. All rights reserved.</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center md:justify-end items-center">
                        <span>사업자등록번호: 141-39-01329</span>
                        <span>대표: 장은태</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
