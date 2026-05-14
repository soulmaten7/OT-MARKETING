import Link from "next/link";

export function UpsellBanner() {
    return (
        <div className="rounded-2xl bg-primary-50 border border-primary-200 p-5 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-primary-700 text-sm font-semibold mb-1">
                        더 강력한 DB 수집이 필요하세요?
                    </p>
                    <p className="text-primary-600 text-sm">
                        블로그문자보다 더 강력한 풀 사이즈 랜딩페이지로 진짜 고객을 모으세요.
                    </p>
                </div>
                <Link
                    href="/landing-pages"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold rounded-full whitespace-nowrap transition-colors"
                >
                    구독형 랜딩페이지 보기
                </Link>
            </div>
        </div>
    );
}
