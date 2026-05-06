import Link from "next/link";

export function UpsellBanner() {
    return (
        <div className="rounded-2xl bg-gradient-to-r from-[var(--navy-900)] to-[var(--gold-600)] p-5 md:p-6 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-white text-sm font-semibold mb-1 flex items-center gap-2">
                        <span>🎨</span>
                        곧 출시 — 셀프 랜딩페이지
                    </p>
                    <p className="text-white/85 text-sm">
                        블로그문자보다 더 강력한 풀 사이즈 랜딩페이지로 진짜 고객을 모으세요.
                    </p>
                </div>
                <Link
                    href="/landing-pages"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-[var(--navy-900)] text-sm font-bold rounded-full whitespace-nowrap hover:bg-[var(--gold-50)]"
                >
                    사전 등록 →
                </Link>
            </div>
        </div>
    );
}
