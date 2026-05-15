"use client";

import type { Profile } from "@/lib/supabase/types";

type BadgeVariant = "primary" | "success" | "warning" | "neutral" | "error";

function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
    const styles: Record<BadgeVariant, string> = {
        primary: "bg-primary-50 text-primary-600 border border-primary-200",
        success: "bg-green-50 text-green-700 border border-green-200",
        warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
        neutral: "bg-neutral-100 text-neutral-600 border border-neutral-200",
        error: "bg-red-50 text-ot-error border border-red-200",
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}>
            {children}
        </span>
    );
}

function FeatureCard({
    title,
    description,
    badge,
    badgeVariant,
    ctaText,
    ctaHref,
    disabled,
}: {
    title: string;
    description: string;
    badge: string;
    badgeVariant: BadgeVariant;
    ctaText: string;
    ctaHref: string;
    disabled?: boolean;
}) {
    return (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <h2 className="text-base font-bold text-neutral-900">{title}</h2>
                <Badge variant={badgeVariant}>{badge}</Badge>
            </div>
            <p className="text-sm text-neutral-500 flex-1">{description}</p>
            {disabled ? (
                <span className="w-full text-center bg-neutral-100 text-neutral-400 font-semibold py-2.5 rounded-xl text-sm cursor-not-allowed">
                    {ctaText}
                </span>
            ) : (
                <a
                    href={ctaHref}
                    className="w-full text-center bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                >
                    {ctaText}
                </a>
            )}
        </div>
    );
}

interface Props {
    userEmail: string;
    profile: Profile | null;
    landingPageCount?: number;
}

export function DashboardClient({ userEmail, profile, landingPageCount }: Props) {
    const landingStatus = profile?.landing_subscription_status ?? "none";
    const cpaStatus = profile?.cpa_inquiry_status ?? "none";
    const displayName = profile?.display_name ?? userEmail.split("@")[0];

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* 헤더 */}
            <header className="bg-white border-b border-neutral-100 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                    <a href="/" className="text-lg font-bold text-neutral-900">OT MARKETING</a>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-500 hidden sm:block">{userEmail}</span>
                        <a
                            href="/logout"
                            className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                        >
                            로그아웃
                        </a>
                    </div>
                </div>
            </header>

            {/* 본문 */}
            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* 인사말 */}
                <div className="mb-10">
                    <h1 className="text-2xl font-bold text-neutral-900">
                        {displayName}님, 안녕하세요 👋
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        OT MARKETING 플랫폼에서 3가지 서비스를 관리하세요.
                    </p>
                </div>

                {/* 3 기능 카드 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 구독형 랜딩페이지 */}
                    <FeatureCard
                        title="구독형 랜딩페이지"
                        description={
                            landingStatus === "active" && landingPageCount !== undefined && landingPageCount > 0
                                ? `랜딩페이지 ${landingPageCount}개 운영 중. 관리하고 전환율을 확인하세요.`
                                : landingStatus === "active"
                                ? "내 랜딩페이지를 관리하고 전환율을 확인하세요."
                                : "월 구독으로 전문 랜딩페이지를 운영하세요. 광고 효율이 2배 올라갑니다."
                        }
                        badge={
                            landingStatus === "active" ? "구독 중" :
                            landingStatus === "past_due" ? "결제 필요" :
                            landingStatus === "canceled" ? "구독 종료" : "미구독"
                        }
                        badgeVariant={
                            landingStatus === "active" ? "success" :
                            landingStatus === "past_due" ? "error" :
                            landingStatus === "canceled" ? "neutral" : "neutral"
                        }
                        ctaText={landingStatus === "active" ? "내 랜딩페이지 관리" : landingStatus === "past_due" ? "결제 정보 확인" : "구독하고 시작하기"}
                        ctaHref={landingStatus === "active" ? "/landing-pages/manage" : "/subscribe"}
                    />

                    {/* 문자문의 만들기 */}
                    <FeatureCard
                        title="문자문의 만들기"
                        description="블로그 링크를 SMS로 보내세요. 고객이 클릭하면 내용을 바로 확인합니다. 무료로 즉시 사용 가능."
                        badge="무료"
                        badgeVariant="success"
                        ctaText="문자문의 만들기 만들기"
                        ctaHref="/blog-sms/dashboard"
                    />

                    {/* CPA 광고 신청 */}
                    <FeatureCard
                        title="CPA 광고 신청"
                        description={
                            cpaStatus === "contracted"
                                ? "현재 진행 중인 광고 현황을 확인하세요."
                                : cpaStatus === "inquired"
                                ? "문의가 접수되었습니다. 담당자가 연락드립니다."
                                : "성과 기반 광고. 전환이 발생했을 때만 비용이 청구됩니다."
                        }
                        badge={
                            cpaStatus === "contracted" ? "계약 중" :
                            cpaStatus === "inquired" ? "문의 진행 중" : "신청 가능"
                        }
                        badgeVariant={
                            cpaStatus === "contracted" ? "success" :
                            cpaStatus === "inquired" ? "warning" : "neutral"
                        }
                        ctaText={
                            cpaStatus === "contracted" ? "광고 현황 보기" :
                            cpaStatus === "inquired" ? "문의 내역 확인" : "광고 신청 문의"
                        }
                        ctaHref="/contact"
                        disabled={cpaStatus === "inquired"}
                    />
                </div>

                {/* 안내 문구 */}
                <div className="mt-8 bg-primary-50 border border-primary-100 rounded-xl px-5 py-4">
                    <p className="text-sm text-primary-700">
                        <strong>문자문의 만들기는 무료</strong>로 지금 바로 사용할 수 있어요.
                        랜딩페이지 구독이나 CPA 광고 신청은 언제든지 업그레이드할 수 있습니다.
                    </p>
                </div>
            </div>
        </main>
    );
}
