import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-200">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 회사 정보 */}
                    <div>
                        <p className="text-base font-bold text-neutral-900 mb-3">OT MARKETING</p>
                        <p className="text-sm text-neutral-600 leading-relaxed mb-2">
                            대표: 장은태
                        </p>
                        <p className="text-sm text-neutral-600 leading-relaxed mb-2">
                            사업자등록번호: 141-39-01329
                        </p>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            CPA 광고 의뢰 전문
                        </p>
                    </div>

                    {/* 연락처 */}
                    <div>
                        <p className="text-xs font-semibold text-neutral-400 tracking-widest uppercase mb-3">연락처</p>
                        <ul className="space-y-2 text-sm text-neutral-600">
                            <li>
                                <a href="mailto:soulmaten7@gmail.com" className="hover:text-neutral-900 transition-colors">
                                    soulmaten7@gmail.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://open.kakao.com/o/sw2Zxm9h"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-neutral-900 transition-colors"
                                >
                                    카카오톡 오픈채팅
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 약관 + 카피라이트 */}
                <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-neutral-400">
                    <p>© {new Date().getFullYear()} OT MARKETING. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-neutral-700 transition-colors">개인정보처리방침</Link>
                        <Link href="/terms" className="hover:text-neutral-700 transition-colors">이용약관</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
