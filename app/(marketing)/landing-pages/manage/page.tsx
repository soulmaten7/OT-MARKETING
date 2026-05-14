import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Plus, ExternalLink, BarChart2, Pencil, Globe, FileText } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import type { LandingPage } from "@/lib/supabase/types";

export const metadata: Metadata = {
    title: "내 랜딩페이지 — OT MARKETING",
    robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// STEP_105 — 개발 모드 우회 플래그 (next.config.mjs env 정적 주입)
const DEV_BYPASS_AUTH = process.env.BYPASS_AUTH_DEV === "true";

const INDUSTRY_NAMES: Record<string, string> = {
    debt: "개인회생·파산",
    rental: "정수기·렌탈",
    broadband: "인터넷·통신",
    invest: "주식·투자",
    realestate: "부동산·임대",
    medical: "의료·병원",
};

const DEV_MOCK_PAGES: LandingPage[] = [
    {
        id: "mock-1",
        user_id: "dev-mock",
        slug: "boglaw-debt-2026",
        industry: "debt",
        title: "법률사무소 보광 — 개인회생 신청",
        status: "published",
        config: {},
        submission_count: 47,
        published_at: "2026-05-01T00:00:00Z",
        created_at: "2026-05-01T00:00:00Z",
        updated_at: "2026-05-14T00:00:00Z",
    },
    {
        id: "mock-2",
        user_id: "dev-mock",
        slug: "test-rental-2026",
        industry: "rental",
        title: "테스트 — 정수기 렌탈",
        status: "draft",
        config: {},
        submission_count: 0,
        published_at: null,
        created_at: "2026-05-10T00:00:00Z",
        updated_at: "2026-05-10T00:00:00Z",
    },
];

function StatusBadge({ status }: { status: LandingPage["status"] }) {
    if (status === "published") return <Badge variant="success">발행 중</Badge>;
    if (status === "paused") return <Badge variant="warning">일시 중지</Badge>;
    return <Badge variant="neutral">초안</Badge>;
}

function LpCard({ lp }: { lp: LandingPage }) {
    const industryName = INDUSTRY_NAMES[lp.industry] ?? lp.industry;
    const publishedUrl = `https://otpage1.com/${lp.slug}`;

    return (
        <div
            data-testid="lp-card"
            className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
        >
            {/* 상단: 제목 + 상태 */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-400 mb-1">{industryName}</p>
                    <h2 className="text-sm font-bold text-neutral-900 leading-tight truncate">{lp.title}</h2>
                </div>
                <StatusBadge status={lp.status} />
            </div>

            {/* 통계 */}
            <div className="flex items-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                    <BarChart2 className="w-3.5 h-3.5" />
                    신청 {lp.submission_count}건
                </span>
                {lp.status === "published" && lp.published_at && (
                    <span>
                        {new Date(lp.published_at).toLocaleDateString("ko-KR", {
                            month: "short",
                            day: "numeric",
                        })} 발행
                    </span>
                )}
            </div>

            {/* 발행 URL */}
            {lp.status === "published" && (
                <a
                    href={publishedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-primary-600 hover:underline truncate"
                >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    otpage1.com/{lp.slug}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
            )}

            {/* 액션 */}
            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-neutral-100">
                <Link
                    href={`/landing-pages/manage/${lp.id}/edit`}
                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-primary-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary-50"
                >
                    <Pencil className="w-3.5 h-3.5" />
                    수정
                </Link>
                {lp.status === "published" && (
                    <a
                        href={publishedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-primary-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary-50"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        미리보기
                    </a>
                )}
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-5">
                <FileText className="w-8 h-8 text-primary-400" />
            </div>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
                아직 만든 랜딩페이지가 없어요
            </h2>
            <p className="text-sm text-neutral-500 mb-8 max-w-xs">
                업종 선택 → 정보 입력 → 5분 완성.<br />
                첫 랜딩페이지를 지금 만들어보세요.
            </p>
            <Link
                href="/landing-pages/manage/new"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors"
            >
                <Plus className="w-4 h-4" />
                첫 랜딩페이지 만들기
            </Link>
        </div>
    );
}

export default async function ManagePage() {
    let pages: LandingPage[] = [];
    let userEmail = "";

    if (DEV_BYPASS_AUTH) {
        pages = DEV_MOCK_PAGES;
        userEmail = "dev@ot-marketing.kr";
    } else {
        if (!isSupabaseConfigured()) {
            return (
                <main className="min-h-screen bg-neutral-50 flex items-center justify-center">
                    <p className="text-neutral-500">서비스 점검 중입니다.</p>
                </main>
            );
        }
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) redirect("/login");
        userEmail = user.email ?? "";

        const { data } = await supabase
            .from("landing_pages")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        pages = (data as LandingPage[]) ?? [];
    }

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* 헤더 */}
            <header className="bg-white border-b border-neutral-100 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
                            대시보드
                        </Link>
                        <span className="text-neutral-200">/</span>
                        <span className="text-sm font-semibold text-neutral-900">내 랜딩페이지</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {userEmail && (
                            <span className="text-sm text-neutral-400 hidden sm:block">{userEmail}</span>
                        )}
                        <Link href="/logout" className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors">
                            로그아웃
                        </Link>
                    </div>
                </div>
            </header>

            {/* 본문 */}
            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* 타이틀 + 새 LP 버튼 */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">내 랜딩페이지</h1>
                        {pages.length > 0 && (
                            <p className="mt-1 text-sm text-neutral-500">
                                {pages.filter((p) => p.status === "published").length}개 발행 중
                                {" · "}
                                전체 {pages.length}개
                            </p>
                        )}
                    </div>
                    {pages.length > 0 && (
                        <Link
                            href="/landing-pages/manage/new"
                            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 px-5 rounded-xl text-sm transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            새 랜딩페이지
                        </Link>
                    )}
                </div>

                {/* 개발 모드 배너 */}
                {DEV_BYPASS_AUTH && (
                    <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
                        <p className="text-xs text-orange-700">
                            🛠️ 개발 모드 — mock 데이터 표시 중. NEXT_PUBLIC_DEV_BYPASS_AUTH=true 활성.
                        </p>
                    </div>
                )}

                {/* LP 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pages.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <>
                            {pages.map((lp) => (
                                <LpCard key={lp.id} lp={lp} />
                            ))}
                            {/* "+ 새로 만들기" 카드 */}
                            <Link
                                href="/landing-pages/manage/new"
                                className="flex flex-col items-center justify-center min-h-[200px] rounded-2xl border-2 border-dashed border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                            >
                                <Plus className="w-8 h-8 text-neutral-300 group-hover:text-primary-400 transition-colors mb-2" />
                                <span className="text-sm font-medium text-neutral-400 group-hover:text-primary-600 transition-colors">
                                    새 랜딩페이지 만들기
                                </span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
