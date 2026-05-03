import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "개인정보 수집·이용 동의 (시안)",
    description: "OT MARKETING 개인정보 수집·이용 동의 약관 시안 (KISA 표준 양식 기반).",
};

export default function PrivacyCollectionPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-12 bg-white text-gray-900">
            <h1 className="text-2xl font-bold mb-6">개인정보 수집·이용 동의 (시안)</h1>
            <p className="text-yellow-700 bg-yellow-50 p-4 rounded mb-6 text-sm">
                ⚠️ 본 약관 = KISA 표준 양식 기반 시안. 변호사 검토 후 최종 박을 예정.
            </p>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">1. 수집 항목</h2>
                <ul className="list-disc ml-6 text-sm leading-relaxed">
                    <li>이름, 연락처</li>
                    <li>자가진단 응답 (소득·부채·자산·연체·직업·가족 등)</li>
                    <li>제출 시각, 랜딩 URL</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">2. 수집·이용 목적</h2>
                <ul className="list-disc ml-6 text-sm leading-relaxed">
                    <li>자격 진단 결과 안내</li>
                    <li>(제3자 제공 동의 시) 매칭 광고주 상담 예약</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">3. 보유·이용 기간</h2>
                <p className="text-sm leading-relaxed">
                    이용 목적 달성 후 즉시 파기. 단, 관련 법령 (전자상거래 등에서의 소비자보호에 관한 법률 등) 보존 의무 시 해당 기간 보존.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">4. 동의 거부 권리</h2>
                <p className="text-sm leading-relaxed">
                    이용자는 동의 거부 권리가 있으며, 거부 시 자가진단 결과 안내 서비스 이용에 제한이 있습니다.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">5. 처리 위탁·제3자 제공</h2>
                <p className="text-sm leading-relaxed">
                    제3자 제공은 별도 동의 (제3자 제공 동의 약관) 받은 경우에 한함.
                </p>
            </section>

            <section className="text-xs text-gray-500 mt-12 pt-6 border-t border-gray-200">
                <p>제정일: 2026-05-03 · 시안 v1 (STEP_44 v2 Phase 3)</p>
                <p className="mt-1">사업자: OT MARKETING (사업자등록 진행 중)</p>
            </section>
        </main>
    );
}
