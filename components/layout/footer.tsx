import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-200">
            <div className="max-w-6xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-lg font-bold text-neutral-900">
                            OT MARKETING
                        </Link>
                        <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                            광고주가 직접 운영하는<br />마케팅 인프라.
                        </p>
                        <div className="mt-4 flex flex-col gap-1.5 text-sm text-neutral-500">
                            <a href="mailto:soulmaten7@gmail.com" className="hover:text-neutral-700 transition-colors">
                                soulmaten7@gmail.com
                            </a>
                            <a
                                href="https://open.kakao.com/o/sw2Zxm9h"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-neutral-700 transition-colors"
                            >
                                카카오톡 오픈채팅
                            </a>
                        </div>
                    </div>

                    {/* 서비스 */}
                    <div>
                        <h4 className="text-xs font-semibold text-neutral-400 tracking-widest uppercase mb-4">서비스</h4>
                        <ul className="space-y-2.5 text-sm text-neutral-600">
                            <li><Link href="/cpa" className="hover:text-neutral-900 transition-colors">CPA 광고 신청</Link></li>
                            <li><Link href="/landing-pages" className="hover:text-neutral-900 transition-colors">구독형 랜딩페이지</Link></li>
                            <li><Link href="/blog-sms" className="hover:text-neutral-900 transition-colors">블로그문자</Link></li>
                            <li><Link href="/ads" className="hover:text-neutral-900 transition-colors">광고 크리에이티브</Link></li>
                        </ul>
                    </div>

                    {/* 회사 */}
                    <div>
                        <h4 className="text-xs font-semibold text-neutral-400 tracking-widest uppercase mb-4">회사</h4>
                        <ul className="space-y-2.5 text-sm text-neutral-600">
                            <li><Link href="/terms" className="hover:text-neutral-900 transition-colors">이용약관</Link></li>
                            <li><Link href="/privacy" className="hover:text-neutral-900 transition-colors">개인정보처리방침</Link></li>
                            <li>
                                <Link href="/admin/guide" prefetch={false} className="hover:text-neutral-900 transition-colors">
                                    관리자
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 고객지원 */}
                    <div>
                        <h4 className="text-xs font-semibold text-neutral-400 tracking-widest uppercase mb-4">고객지원</h4>
                        <ul className="space-y-2.5 text-sm text-neutral-600">
                            <li>
                                <a
                                    href="https://open.kakao.com/o/sw2Zxm9h"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-neutral-900 transition-colors"
                                >
                                    문의하기
                                </a>
                            </li>
                            <li><Link href="/blog-sms/guide" className="hover:text-neutral-900 transition-colors">블로그문자 가이드</Link></li>
                            <li><Link href="/blog-sms/faq" className="hover:text-neutral-900 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-neutral-400">
                    <p>© {new Date().getFullYear()} OT MARKETING. All rights reserved.</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <span>사업자등록번호: 141-39-01329</span>
                        <span>대표: 장은태</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
