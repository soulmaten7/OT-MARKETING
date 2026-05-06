"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { savePageAction } from "@/app/(marketing)/blog-sms/dashboard/edit/actions";
import type { IndustryTemplate } from "@/lib/blog-sms/templates";
import type { SmsPage } from "@/lib/supabase/types";

type Props = {
    templates: IndustryTemplate[];
    initialPage: SmsPage | null;
    initialPhonePrivate: boolean;
    username: string;
};

export function EditForm({ templates, initialPage, initialPhonePrivate, username }: Props) {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const [industry, setIndustry] = useState(initialPage?.industry ?? "general");
    const [title, setTitle] = useState(initialPage?.title ?? templates[0].default_title);
    const [description, setDescription] = useState(
        initialPage?.description ?? templates[0].default_description,
    );
    const [message, setMessage] = useState(
        initialPage?.pre_filled_message ?? templates[0].default_message,
    );
    const [previewImageUrl, setPreviewImageUrl] = useState(
        initialPage?.preview_image_url ?? "",
    );
    const [phonePrivate, setPhonePrivate] = useState(initialPhonePrivate);

    const onIndustryChange = (key: string) => {
        setIndustry(key);
        const t = templates.find((x) => x.industry_key === key);
        if (!t) return;
        // 사용자가 손대지 않은 경우만 자동 채움
        if (!initialPage) {
            setTitle(t.default_title);
            setDescription(t.default_description);
            setMessage(t.default_message);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
            const res = await savePageAction(fd);
            if (res && !res.ok) setError(res.error);
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6"
        >
            <div>
                <label className="block text-sm font-semibold text-[var(--navy-900)] mb-2">
                    업종 템플릿
                </label>
                <select
                    name="industry"
                    value={industry}
                    onChange={(e) => onIndustryChange(e.target.value)}
                    className="ot-input"
                >
                    {templates.map((t) => (
                        <option key={t.industry_key} value={t.industry_key}>
                            {t.industry_name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-semibold text-[var(--navy-900)] mb-1.5">
                    제목 <span className="text-[var(--coral-500)]">*</span>
                </label>
                <input
                    type="text"
                    name="title"
                    required
                    maxLength={80}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="ot-input"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-[var(--navy-900)] mb-1.5">
                    설명
                </label>
                <textarea
                    name="description"
                    rows={3}
                    maxLength={500}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="ot-input"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-[var(--navy-900)] mb-1.5">
                    미리채워진 SMS 메시지
                </label>
                <textarea
                    name="pre_filled_message"
                    rows={5}
                    maxLength={500}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="ot-input font-mono text-sm"
                />
                <p className="text-xs text-[var(--slate-500)] mt-1.5">
                    방문자가 SMS 버튼을 누를 때 자동으로 채워집니다.
                </p>
            </div>

            <div>
                <label className="block text-sm font-semibold text-[var(--navy-900)] mb-1.5">
                    미리보기 이미지 URL (선택)
                </label>
                <input
                    type="url"
                    name="preview_image_url"
                    value={previewImageUrl}
                    onChange={(e) => setPreviewImageUrl(e.target.value)}
                    placeholder="https://...preview-images/myimage.jpg"
                    className="ot-input"
                />
                <p className="text-xs text-[var(--slate-500)] mt-1.5">
                    Supabase Storage 의 <code>preview-images</code> 버킷에 업로드한 URL.
                    비워두면 자동 OG 이미지가 사용됩니다.
                </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    name="phone_private"
                    checked={phonePrivate}
                    onChange={(e) => setPhonePrivate(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-[var(--coral-500)]"
                />
                <span className="text-sm text-[var(--slate-700)]">
                    번호를 페이지에 노출하지 않습니다 (비공개 모드)
                </span>
            </label>

            <div className="rounded-xl bg-[var(--slate-50)] border border-slate-200 px-4 py-3 text-sm">
                <span className="text-[var(--slate-500)]">공개 URL: </span>
                <span className="font-mono text-[var(--navy-900)] break-all">
                    /blog-sms/{username}
                </span>
            </div>

            {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="flex flex-wrap gap-3">
                <button
                    type="submit"
                    disabled={pending}
                    className="px-7 py-3 rounded-full bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-semibold transition-colors disabled:opacity-50"
                >
                    {pending ? "저장 중..." : "저장"}
                </button>
                <Link
                    href="/blog-sms/dashboard"
                    className="px-7 py-3 rounded-full border border-slate-300 text-[var(--navy-900)] font-semibold hover:border-[var(--navy-900)]"
                >
                    취소
                </Link>
            </div>
        </form>
    );
}
