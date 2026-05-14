import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Check, CreditCard } from "lucide-react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BillingAuthButton } from "@/components/payment/BillingAuthButton";

export const metadata: Metadata = {
    title: "구독 시작 — OT MARKETING",
    description: "구독형 랜딩페이지 정기결제 등록",
};

const PLAN_AMOUNT: number = 0;
const PLAN_NAME = "구독형 랜딩페이지";

const PLAN_FEATURES = [
    "코딩 없이 5분 만에 랜딩페이지 완성",
    "업종별 검증된 전환 패턴 (6 업종)",
    "DB 자동 수집 + 구글 시트 분배",
    "텔레그램 실시간 신청 알림",
    "Meta Pixel + Google 전환 추적",
    "월 이용 취소 언제든 가능",
];

export default async function SubscribePage() {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll(); },
                setAll() {},
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("display_name, landing_subscription_status")
        .eq("id", user.id)
        .maybeSingle();

    // 이미 구독 중이면 대시보드로
    if (profile?.landing_subscription_status === "active") {
        redirect("/dashboard");
    }

    const displayName = profile?.display_name ?? user.email?.split("@")[0] ?? "고객";

    return (
        <>
            <Section variant="white" size="xl" className="pt-24 md:pt-32">
                <div className="max-w-2xl mx-auto text-center">
                    <Badge variant="primary" className="mb-4">구독형 랜딩페이지</Badge>
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mt-3">
                        {displayName}님,<br />지금 바로 시작하세요
                    </h1>
                    <p className="mt-4 text-neutral-500">
                        카드 한 장 등록하면 다음 결제일까지 구독형 랜딩페이지를 무제한 운영할 수 있습니다.
                    </p>
                </div>
            </Section>

            <Section variant="muted" size="md">
                <div className="max-w-lg mx-auto space-y-6">
                    {/* 플랜 카드 */}
                    <Card variant="primary" className="p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <p className="text-sm font-semibold text-primary-600 mb-1">{PLAN_NAME}</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-neutral-900">
                                        {PLAN_AMOUNT === 0 ? "가격 확정 예정" : `₩${PLAN_AMOUNT.toLocaleString()}`}
                                    </span>
                                    {PLAN_AMOUNT > 0 && <span className="text-neutral-500">/월</span>}
                                </div>
                            </div>
                            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-primary-600" />
                            </div>
                        </div>

                        <ul className="space-y-2.5 mb-8">
                            {PLAN_FEATURES.map((f) => (
                                <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-700">
                                    <Check className="w-4 h-4 text-primary-500 shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <BillingAuthButton
                            userEmail={user.email ?? ""}
                            userName={displayName}
                            userId={user.id}
                        />
                    </Card>

                    {/* 안내 */}
                    <p className="text-xs text-neutral-400 text-center leading-relaxed">
                        카드 등록 후 첫 결제가 진행됩니다. 언제든지 대시보드에서 해지할 수 있습니다.<br />
                        가맹점 승인 전 = 테스트 모드 (실제 결제 X).
                    </p>
                </div>
            </Section>
        </>
    );
}
