"use client";

type Props = {
    pageId: string;
    phone: string;
    phonePrivate: boolean;
    preFilledMessage: string;
};

function buildSmsHref(phone: string, body: string) {
    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    // iOS: sms:phone&body=... / Android: sms:phone?body=...
    // 두 매체 호환을 위해 ?body= 사용 (대부분 정상 작동)
    return `sms:${cleanPhone}?body=${encodeURIComponent(body)}`;
}

export function SmsButton({ pageId, phone, phonePrivate, preFilledMessage }: Props) {
    const handleClick = async () => {
        // 클릭 카운트 (best-effort, 실패해도 SMS 호출은 진행)
        try {
            await fetch(`/blog-sms/api/click?page=${encodeURIComponent(pageId)}`, {
                method: "POST",
                cache: "no-store",
            });
        } catch {
            // ignore
        }
    };

    const href = buildSmsHref(phone, preFilledMessage);

    return (
        <div className="space-y-3">
            <a
                href={href}
                onClick={handleClick}
                className="block w-full text-center px-6 py-5 rounded-2xl bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-bold text-lg transition-colors"
            >
                📱 문자로 문의하기
            </a>
            {!phonePrivate && (
                <p className="text-center text-sm text-[var(--slate-500)]">
                    버튼을 누르면 본인 휴대폰 SMS 앱이 열리며 메시지가 자동 채워집니다.
                </p>
            )}
            {phonePrivate && (
                <p className="text-center text-xs text-[var(--slate-500)]">
                    번호 비공개 · 본인 SMS 앱에서 미리채워진 메시지로 곧바로 전송됩니다.
                </p>
            )}
        </div>
    );
}
