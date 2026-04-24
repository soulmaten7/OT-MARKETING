import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[var(--navy)] text-white/80 py-16">
            <div className="ot-container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="font-serif text-2xl tracking-tight text-white">
                            OT <span className="text-[var(--gold)]">MARKETING</span>
                        </Link>
                        <p className="mt-4 text-sm text-white/60 max-w-sm leading-relaxed">
                            업종 전문 CPA 마케팅 에이전시.<br />
                            6 업종 특화 랜딩 자산 · 상담 스크립트 · 표준계약서 완비.
                        </p>
                        <div className="mt-6 flex flex-col gap-2 text-sm text-white/70">
                            <p>Email · soulmaten1007@gmail.com</p>
                            <p>Tel · 070-4367-4013</p>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-[var(--gold)] text-xs tracking-widest font-bold mb-4">SERVICES</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><Link href="/showcase" className="hover:text-[var(--gold)] transition-colors">시안 미리보기</Link></li>
                            <li><Link href="/#how-it-works" className="hover:text-[var(--gold)] transition-colors">운영 절차</Link></li>
                            <li><Link href="/#industries" className="hover:text-[var(--gold)] transition-colors">업종</Link></li>
                            <li><Link href="/#contact" className="hover:text-[var(--gold)] transition-colors">상담 신청</Link></li>
                        </ul>
                    </div>

                    {/* Legal + Admin */}
                    <div>
                        <h4 className="text-[var(--gold)] text-xs tracking-widest font-bold mb-4">LEGAL</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><Link href="/privacy" className="hover:text-[var(--gold)] transition-colors">개인정보처리방침</Link></li>
                            <li><Link href="/terms" className="hover:text-[var(--gold)] transition-colors">이용약관</Link></li>
                        </ul>

                        <h4 className="text-[var(--gold)] text-xs tracking-widest font-bold mt-8 mb-4">INTERNAL</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li>
                                <Link href="/admin/guide" className="inline-flex items-center gap-1.5 hover:text-[var(--gold)] transition-colors">
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
