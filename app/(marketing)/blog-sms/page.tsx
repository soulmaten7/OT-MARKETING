import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "문자문의 만들기 — OT MARKETING (완전 무료)",
    description:
        "블로그·인스타·명함에 문자 버튼 연결하는 가장 빠른 방법. 회원가입 1분, 평생 100% 무료, 결제 정보 0건. 14 업종 템플릿 즉시 사용.",
    openGraph: {
        title: "문자문의 만들기 — OT MARKETING (완전 무료)",
        description: "블로그·인스타·명함에 문자 버튼 연결하는 가장 빠른 방법. 평생 100% 무료. 결제 정보 0건.",
        type: "website",
    },
};

const VALUE_PROPS = [
    {
        title: "블로그 지수 보호",
        body: "전화번호를 글에 직접 노출 X. 안전한 SMS 링크 한 줄로 연결 = 검색엔진 저품질 위험 0.",
    },
    {
        title: "미리채워진 답신",
        body: "방문자가 버튼 누르면 14 업종 템플릿이 자동 채워진 SMS 앱이 즉시 열림. 응대 자동화.",
    },
    {
        title: "1 클릭 연결",
        body: "방문자는 한 번의 탭으로 본인 휴대폰 SMS 앱 호출. 망설임 0 = 문의율 상승.",
    },
];

const FEATURES = [
    { title: "평생 100% 무료", body: "회원가입·페이지 발급·SMS 링크 모두 0원. 결제 정보 입력 X. 한도 X. 카드 X." },
    { title: "1분 셋업", body: "이메일·아이디·휴대폰 한 번 입력 = ot-marketing.kr/blog-sms/내아이디 즉시 발급." },
    { title: "14 업종 템플릿", body: "예약·부동산·법률·세무·보험·과외·헬스·미용·청소·인테리어 등 즉시 사용 메시지." },
    { title: "비공개 번호", body: "번호 노출 없이 답신을 받고 싶다면 비공개 옵션 1 클릭." },
    { title: "OG 이미지 자동", body: "카톡·페이스북에 링크 붙여넣을 때 미리보기 카드 자동. 직접 업로드도 가능." },
    { title: "방문·클릭 통계", body: "내 페이지가 몇 번 열렸고 SMS 버튼이 몇 번 눌렸는지 즉시 확인." },
];

const STEPS = [
    { n: "01", title: "회원가입", body: "이메일·아이디 4~20자·휴대폰 한 번만 입력." },
    { n: "02", title: "업종 선택", body: "14 업종 템플릿 중 1 개 선택. 메시지·제목 즉시 채움." },
    { n: "03", title: "링크 공유", body: "ot-marketing.kr/blog-sms/내아이디 를 블로그·SNS 에 추가." },
    { n: "04", title: "문자 받기", body: "방문자가 버튼 누르면 본인 SMS 앱 자동 호출 → 미리채워진 메시지." },
];

const USE_CASES = [
    { label: "네이버 블로그 글 끝" },
    { label: "인스타 프로필 링크" },
    { label: "카카오톡 채널 답신" },
    { label: "유튜브 영상 설명" },
    { label: "명함 QR 코드" },
    { label: "매장 입구 QR" },
];

export default function BlogSmsLanding() {
    return (
        <>
            {/* Hero */}
            <Section variant="white" size="xl" className="pt-24 md:pt-32">
                <div className="max-w-3xl mx-auto text-center">
                    <Badge variant="success" className="mb-4">완전 무료</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-tight mt-3">
                        블로그 글 + 문자 자동화,<br />무료로 시작하세요
                    </h1>
                    <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
                        14개 업종별 블로그 콘텐츠 + 문자 발송 자동화.<br />
                        가입만 하면 바로 사용할 수 있어요. 결제 정보 X · 카드 등록 X · 한도 X.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-base transition-colors"
                        >
                            무료로 시작하기
                        </Link>
                        <Link
                            href="/blog-sms/guide"
                            className="inline-flex items-center justify-center px-8 py-3.5 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-semibold rounded-full text-base transition-colors"
                        >
                            활용 가이드 22가지
                        </Link>
                    </div>
                </div>
            </Section>

            {/* 핵심 가치 3개 */}
            <Section variant="muted" size="md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {VALUE_PROPS.map((v) => (
                        <Card key={v.title} className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5 text-primary-600" />
                                </div>
                                <h3 className="font-bold text-neutral-900">{v.title}</h3>
                            </div>
                            <p className="text-sm text-neutral-500 leading-relaxed">{v.body}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* 핵심 기능 — SMS mockup */}
            <Section variant="white" size="lg">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <Badge variant="primary" className="mb-4">핵심 기능</Badge>
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-5 leading-tight">
                            업종에 맞는 답신을<br />미리 설정해두세요
                        </h2>
                        <p className="text-base md:text-lg text-neutral-500 leading-relaxed mb-7">
                            14 업종 템플릿 중 하나 선택 = 메시지·제목 즉시 채움. 방문자가 SMS 버튼 누르면 본인 휴대폰 SMS 앱이 자동 호출되며, 설정한 텍스트가 그대로 들어갑니다.
                        </p>
                        <ul className="space-y-3">
                            {[
                                "방문자 휴대폰 통신비로 발송 = 사용자 비용 0",
                                "비공개 번호 옵션으로 본인 번호 노출 X",
                                "방문 수·클릭 수 실시간 통계",
                                "OG 이미지 자동 생성 (카톡·페북 미리보기)",
                            ].map((t) => (
                                <li key={t} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                                    <span className="text-sm text-neutral-600">{t}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SMS mockup */}
                    <div className="relative mx-auto w-full max-w-sm">
                        <div className="rounded-[2rem] bg-neutral-900 p-3 shadow-2xl">
                            <div className="rounded-[1.5rem] bg-white overflow-hidden">
                                <div className="bg-neutral-50 px-5 py-4 border-b border-neutral-200 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
                                        나
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-neutral-900">새 메시지</p>
                                        <p className="text-xs text-neutral-500">받는 사람: 010-1234-5678</p>
                                    </div>
                                </div>
                                <div className="px-5 py-6 min-h-[180px] flex items-end">
                                    <div className="bg-primary-500 text-white rounded-2xl rounded-br-md px-4 py-3 ml-auto max-w-[85%] shadow-sm">
                                        <p className="text-sm leading-relaxed">
                                            안녕하세요, 블로그 글 보고 연락드립니다.<br />
                                            <span className="text-white/80">[예약 날짜]</span> /{" "}
                                            <span className="text-white/80">[인원]</span> 문의드려요.
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-neutral-50 px-5 py-3 border-t border-neutral-200 flex items-center gap-2">
                                    <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-neutral-400 ring-1 ring-neutral-200">
                                        메시지 작성...
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
                                        ↑
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-primary-500 text-white text-xs font-bold rounded-full shadow-md">
                            실제 작동 화면
                        </div>
                    </div>
                </div>
            </Section>

            {/* 6 Features */}
            <Section variant="muted" size="lg">
                <SectionHeader>
                    <SectionTitle>모든 기능이 평생 무료</SectionTitle>
                    <SectionDescription>결제 정보 X · 카드 등록 X · 한도 X · 광고 X</SectionDescription>
                </SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((f) => (
                        <Card key={f.title} className="p-6">
                            <h3 className="font-bold text-neutral-900 mb-2">{f.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{f.body}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* 4 Step process */}
            <Section variant="white" size="lg">
                <SectionHeader>
                    <SectionTitle>4단계로 시작</SectionTitle>
                    <SectionDescription>1분이면 내 페이지가 발급됩니다.</SectionDescription>
                </SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STEPS.map((s) => (
                        <div key={s.n} className="flex flex-col gap-3">
                            <span className="text-4xl font-bold text-primary-100">{s.n}</span>
                            <h3 className="text-lg font-bold text-neutral-900">{s.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{s.body}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* 활용 사례 */}
            <Section variant="muted" size="md">
                <SectionHeader>
                    <SectionTitle>어디서든 활용 가능</SectionTitle>
                    <SectionDescription>
                        링크 한 줄만 있으면 어디서든 작동. 블로그·SNS·QR·명함 모두 OK.
                    </SectionDescription>
                </SectionHeader>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {USE_CASES.map((u) => (
                        <Card key={u.label} className="p-5 text-center">
                            <p className="text-sm font-semibold text-neutral-900 leading-tight">{u.label}</p>
                        </Card>
                    ))}
                </div>
                <p className="text-center text-sm text-neutral-400 mt-8">
                    +16가지 더 →{" "}
                    <Link href="/blog-sms/guide" className="text-primary-500 hover:underline font-semibold">
                        전체 22 가이드 보기
                    </Link>
                </p>
            </Section>

            {/* 업셀 CTA — 구독형 랜딩페이지 */}
            <Section variant="white" size="md">
                <div className="max-w-2xl mx-auto">
                    <Card className="p-8 border-primary-200 bg-primary-50">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <Badge variant="primary" className="mb-3">더 강력한 DB 수집</Badge>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">구독형 랜딩페이지</h3>
                                <p className="text-sm text-neutral-600 leading-relaxed">
                                    문자문의 만들기보다 더 강력한 풀 사이즈 랜딩페이지로 진짜 고객을 모으세요.<br />
                                    업종별 검증된 전환 패턴 + DB 자동 수집.
                                </p>
                            </div>
                            <Link
                                href="/landing-pages"
                                className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-sm whitespace-nowrap transition-colors shrink-0"
                            >
                                구독형 랜딩페이지 보기
                            </Link>
                        </div>
                    </Card>
                </div>
            </Section>

            {/* Final CTA */}
            <Section variant="primary" size="lg">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary-900 tracking-tight">
                        지금 무료로 시작하세요
                    </h2>
                    <p className="mt-4 text-base text-primary-700">
                        결제 정보 X · 카드 등록 X · 한도 X · 광고 X.<br />
                        1분이면 내 페이지가 발급됩니다.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full text-base transition-colors"
                        >
                            무료로 시작하기
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center px-8 py-3.5 border border-primary-300 text-primary-700 hover:bg-primary-100 font-semibold rounded-full text-base transition-colors"
                        >
                            로그인
                        </Link>
                    </div>
                </div>
            </Section>
        </>
    );
}
