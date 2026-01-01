import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-secondary py-16 border-t border-border">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="text-xl font-semibold tracking-tight">
                            OT <span className="text-accent">MARKETING</span>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground max-w-sm">
                            매출로 직결되는 고효율 DB. <br />
                            업종의 경계를 넘어, 오직 전환 성과로 증명합니다.
                        </p>
                        <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
                            <p>Email. soulmaten1007@gmail.com</p>
                            <p>Tel. 070-4367-4013</p>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-4">서비스</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                                    운영 프로세스
                                </Link>
                            </li>
                            <li>
                                <Link href="#industries" className="hover:text-foreground transition-colors">
                                    산업 분야
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="hover:text-foreground transition-colors">
                                    상담 신청
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4">법적 고지</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-foreground transition-colors">
                                    개인정보처리방침
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-foreground transition-colors">
                                    이용약관
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
                    <p>© {new Date().getFullYear()} OT MARKETING. All rights reserved.</p>
                    <div className="flex gap-4">
                        <span>사업자등록번호: 141-39-01329</span>
                        <span>대표: 장은태</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
