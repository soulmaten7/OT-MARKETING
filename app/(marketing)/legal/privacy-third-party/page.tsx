import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "제3자 정보 제공 동의 (시안)",
    description: "OT MARKETING 제3자 정보 제공 동의 약관 시안 (변호사·법무법인 매칭 광고주 제공 시).",
};

export default function PrivacyThirdPartyPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-12 bg-white text-gray-900">
            <h1 className="text-2xl font-bold mb-6">제3자 정보 제공 동의 (시안)</h1>
            <p className="text-yellow-700 bg-yellow-50 p-4 rounded mb-6 text-sm">
                ⚠️ 본 약관 = KISA 표준 양식 기반 시안. 변호사 검토 후 최종 박을 예정.
            </p>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">1. 제공받는 자</h2>
                <p className="text-sm leading-relaxed">
                    OT MARKETING 과 광고 계약을 체결한 변호사·법무법인 (등급 A/B 매칭 시).
                    구체적 광고주 정보는 매칭 시점에 별도 안내됩니다.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">2. 제공 항목</h2>
                <ul className="list-disc ml-6 text-sm leading-relaxed">
                    <li>이름, 연락처</li>
                    <li>자가진단 응답 (소득·부채·자산 등)</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">3. 제공 목적</h2>
                <p className="text-sm leading-relaxed">
                    매칭 광고주 (변호사·법무법인) 와의 1:1 상담 예약·진행.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">4. 제공받는 자의 보유·이용 기간</h2>
                <p className="text-sm leading-relaxed">
                    제공 시점부터 3년 또는 광고주 자체 정책 (관련 법령 보존 의무 시 해당 기간).
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">5. 동의 거부 권리</h2>
                <p className="text-sm leading-relaxed">
                    이용자는 제3자 제공 동의 거부 권리가 있으며, 거부 시 매칭 광고주 상담 예약 서비스 이용에 제한이 있습니다.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-bold mb-2">6. 변호사법 §34 준수</h2>
                <p className="text-sm leading-relaxed">
                    OT MARKETING 은 변호사·법무법인의 의뢰인 직접 영업·수임료 % 정산을 일체 수행하지 않습니다.
                    매칭은 광고형 정액 단가로만 운영됩니다 (헌재 2022/05/26, 2021헌마619 광고형 합법 결정 준수).
                </p>
            </section>

            <section className="text-xs text-gray-500 mt-12 pt-6 border-t border-gray-200">
                <p>제정일: 2026-05-03 · 시안 v1 (STEP_44 v2 Phase 3)</p>
                <p className="mt-1">사업자: OT MARKETING (사업자등록 진행 중)</p>
            </section>
        </main>
    );
}
