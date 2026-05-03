import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "마케팅 정보 수신 동의 (시안)",
    description: "OT MARKETING 마케팅 정보 수신 동의 약관 시안 (선택 동의).",
};

export default function MarketingConsentPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-12 bg-white text-gray-900">
            <h1 className="text-2xl font-bold mb-6">마케팅 정보 수신 동의 (시안)</h1>
            <p className="text-yellow-700 bg-yellow-50 p-4 rounded mb-6 text-sm">
                ⚠️ 본 약관 = KISA 표준 양식 기반 시안. 변호사 검토 후 최종 박을 예정. 본 동의 = <strong>선택</strong>입니다.
            </p>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">1. 발신자</h2>
                <p className="text-sm leading-relaxed">OT MARKETING</p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">2. 수신 채널</h2>
                <ul className="list-disc ml-6 text-sm leading-relaxed">
                    <li>이메일</li>
                    <li>SMS · 카카오 알림톡</li>
                    <li>전화 (예외적으로 안내)</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">3. 수신 정보</h2>
                <ul className="list-disc ml-6 text-sm leading-relaxed">
                    <li>신규 서비스·상품 안내</li>
                    <li>이벤트·프로모션 안내</li>
                    <li>고객 만족도 조사</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">4. 수신 거부 (철회)</h2>
                <p className="text-sm leading-relaxed">
                    이용자는 언제든 수신 거부 가능. 이메일 하단 unsubscribe 링크 또는 SMS 답신 "거부" 또는 OT MARKETING 고객센터 연락.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">5. 거부 시 이용 제한 X</h2>
                <p className="text-sm leading-relaxed">
                    본 동의 거부 시에도 자가진단·상담 서비스 이용에 제한이 없습니다.
                </p>
            </section>

            <section className="text-xs text-gray-500 mt-12 pt-6 border-t border-gray-200">
                <p>제정일: 2026-05-03 · 시안 v1 (STEP_44 v2 Phase 3)</p>
                <p className="mt-1">사업자: OT MARKETING (사업자등록 진행 중)</p>
            </section>
        </main>
    );
}
