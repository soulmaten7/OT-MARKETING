import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Q&A — OTMarketing 블로그문자",
    description: "자주 묻는 질문 12 가지. 무료 여부·비용·번호·결제·데이터 보안 등.",
};

const FAQS: { q: string; a: React.ReactNode }[] = [
    {
        q: "정말 무료인가요?",
        a: (
            <>
                네. 회원가입·페이지 발급·SMS 링크·OG 이미지 자동 생성 모두 평생 무료입니다.
                향후 출시할 셀프 랜딩페이지는 별도 Pro 티어로 운영될 예정이지만, 블로그문자 자체는
                계속 무료로 유지됩니다.
            </>
        ),
    },
    {
        q: "SMS 발송 비용은 누가 부담하나요?",
        a: (
            <>
                방문자 본인의 SMS 통신비로 발송됩니다. 본인 휴대폰 SMS 앱이 열리고
                직접 '전송' 버튼을 누르므로, OTMarketing 또는 페이지 운영자에게 비용이 청구되지
                않습니다. 070 번호를 운영하는 경우는 통신사 약정에 따라 운영자가 부담할 수도 있습니다.
            </>
        ),
    },
    {
        q: "070 번호는 어디서 받나요?",
        a: (
            <>
                사업자라면 LG U+ Biz070 (B2B) 추천. 개인은 KT olleh 070 또는 OTMarketing
                향후 출시 예정인 070 운영 옵션을 기다리시면 됩니다.{" "}
                <Link
                    href="/blog-sms/guide/070-free-number"
                    className="text-[var(--coral-600)] underline"
                >
                    가이드 #12
                </Link>{" "}
                참고.
            </>
        ),
    },
    {
        q: "사용자 ID 는 변경 가능한가요?",
        a: (
            <>
                현재 변경 불가입니다. URL 안정성을 위해 한 번 정한 ID 는 영구로 사용됩니다. 다른 ID 가
                필요하면 새 계정으로 가입해 주세요.
            </>
        ),
    },
    {
        q: "페이지 1개 제한인가요?",
        a: (
            <>
                네. 현재 1 사용자 = 1 페이지로 제한됩니다. 향후 출시 예정인 Pro 티어에서는 다수 페이지가
                지원될 예정입니다.
            </>
        ),
    },
    {
        q: "데이터는 어디에 저장되나요?",
        a: (
            <>
                Supabase (한국 Northeast Asia / Seoul 리전) 의 PostgreSQL 데이터베이스에 저장되며,
                전송·저장 시 모두 암호화됩니다. 로그인 세션은 HTTP-only 쿠키로 관리합니다.
            </>
        ),
    },
    {
        q: "광고 자동 연결되나요?",
        a: (
            <>
                자동 X. 사용자가 발급 받은 SMS 페이지 URL 을 직접 광고·블로그·SNS 에 박는 형태입니다.
                추후 OT 광고 인프라와 자동 연결되는 옵션을 고민 중입니다.
            </>
        ),
    },
    {
        q: "미리보기가 깨져요. 어떻게 고치나요?",
        a: (
            <>
                기본 OG 이미지는 자동 생성되므로 브라우저 캐시·SNS 캐시 갱신만으로도 해결되는 경우가
                많습니다. 직접 디자인한 이미지를 쓰고 싶다면{" "}
                <Link
                    href="/blog-sms/guide/og-image-custom"
                    className="text-[var(--coral-600)] underline"
                >
                    가이드 #14
                </Link>{" "}
                를 참고해 주세요.
            </>
        ),
    },
    {
        q: "비공개 번호 보안은 보장되나요?",
        a: (
            <>
                완벽한 100% 보장은 어렵지만, 페이지 텍스트에 번호가 노출되지 않으며 SMS 호출은
                브라우저 내 직접 link 를 통해서만 발생합니다. 개발자 도구를 통한 추출은 항상 가능하므로
                극도로 민감한 번호는 별도 070 가상번호 사용을 권장합니다.
            </>
        ),
    },
    {
        q: "결제 기능은 있나요?",
        a: (
            <>
                현재 X. 블로그문자는 평생 무료이며 결제 정보를 입력 받지 않습니다. 향후 셀프
                랜딩페이지 출시 시 카카오페이·토스 등 결제 연동을 검토 예정입니다.
            </>
        ),
    },
    {
        q: "API 를 제공하나요?",
        a: (
            <>
                현재 X. 향후 Pro 티어에서 페이지 자동 생성·통계 조회 API 를 검토 중입니다.
            </>
        ),
    },
    {
        q: "사업자 등록이 필수인가요?",
        a: (
            <>
                개인도 가입·사용 가능합니다. 다만 070 가상번호 운영, 광고 게재, 마케팅 자동화 등을
                결합하려면 사업자 등록이 권장됩니다.
            </>
        ),
    },
];

export default function FaqPage() {
    return (
        <div className="bg-white pt-32 pb-20">
            <div className="ot-container max-w-3xl">
                <header className="text-center mb-14">
                    <span className="eyebrow">자주 묻는 질문</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--navy-900)] mt-3 mb-4">
                        Q&A
                    </h1>
                    <p className="text-lg text-[var(--slate-700)]">
                        가입 전 자주 받는 질문 12 가지를 모았습니다.
                    </p>
                </header>
                <div className="space-y-4">
                    {FAQS.map((f, i) => (
                        <details
                            key={i}
                            className="group bg-[var(--slate-50)] border border-slate-200 rounded-2xl px-6 py-5 open:bg-white open:border-[var(--coral-400)]"
                        >
                            <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                                <span className="font-bold text-[var(--navy-900)] text-base md:text-lg">
                                    Q{i + 1}. {f.q}
                                </span>
                                <span className="text-[var(--slate-500)] group-open:rotate-180 transition-transform shrink-0">
                                    ▼
                                </span>
                            </summary>
                            <div className="mt-4 text-[var(--slate-700)] leading-relaxed">
                                {f.a}
                            </div>
                        </details>
                    ))}
                </div>

                <div className="mt-14 text-center bg-[var(--slate-50)] rounded-2xl p-8">
                    <p className="text-[var(--slate-700)] mb-4">
                        다른 질문이 있다면 본 페이지 답신 SMS 로 보내주세요.
                    </p>
                    <Link
                        href="/blog-sms/signup"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-semibold transition-colors"
                    >
                        무료로 시작하기 →
                    </Link>
                </div>
            </div>
        </div>
    );
}
