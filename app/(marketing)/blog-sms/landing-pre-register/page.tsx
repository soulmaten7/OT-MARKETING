import type { Metadata } from "next";
import { PreRegisterForm } from "@/components/blog-sms/PreRegisterForm";

export const metadata: Metadata = {
    title: "셀프 랜딩페이지 사전 등록 — OTMarketing",
    description:
        "곧 출시할 OTMarketing 셀프 랜딩페이지의 1순위 알림을 받으세요. 무료 사전 등록.",
};

export default function PreRegisterPage() {
    return (
        <div className="bg-gradient-to-b from-[var(--slate-50)] to-white pt-32 pb-20 min-h-screen">
            <div className="ot-container max-w-2xl">
                <header className="text-center mb-12">
                    <span className="inline-block px-3 py-1 bg-[var(--gold-50)] text-[var(--gold-600)] text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                        곧 출시
                    </span>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy-900)] mb-4">
                        OTMarketing 셀프 랜딩페이지
                    </h1>
                    <p className="text-lg text-[var(--slate-700)]">
                        블로그문자보다 더 강력한 풀 사이즈 랜딩페이지로<br />
                        진짜 매출을 만드는 단계로 넘어가세요.
                    </p>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
                    <h2 className="font-bold text-xl text-[var(--navy-900)] mb-2">
                        1순위 출시 알림 신청
                    </h2>
                    <p className="text-sm text-[var(--slate-700)] mb-7">
                        이메일을 남겨주시면 출시일·얼리버드 가격·런칭 자료를 1순위로 보내드립니다.
                    </p>
                    <PreRegisterForm />
                </div>

                <ul className="mt-10 space-y-3 text-[var(--slate-700)]">
                    <li className="flex items-start gap-2">
                        <span className="text-[var(--coral-500)]">✓</span>
                        14 업종 풀 사이즈 랜딩페이지 템플릿
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[var(--coral-500)]">✓</span>
                        결제·예약·CRM 자동화 통합
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[var(--coral-500)]">✓</span>
                        OT 광고 인프라와 1-click 연결 (무료 광고 노출 옵션)
                    </li>
                </ul>
            </div>
        </div>
    );
}
