"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader2, CheckCircle, MessageCircle, Clock, UserCheck, Gift } from "lucide-react";
import { motion } from "framer-motion";

function formatPhone(raw: string): string {
    let digits = raw.replace(/\D/g, "");
    if (digits.length === 10 && digits.startsWith("1")) digits = "0" + digits;
    digits = digits.slice(0, 11);
    if (digits.startsWith("02")) {
        if (digits.length <= 2) return digits;
        if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
        if (digits.length <= 9) return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
        return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
    }
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    if (digits.startsWith("010")) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

const formSchema = z.object({
    companyName: z.string().min(1, "회사명을 입력해주세요."),
    contactPerson: z.string().min(1, "담당자 성함을 입력해주세요."),
    phone: z.string().min(9, "유효한 연락처를 입력해주세요."),
    email: z.string().email("유효한 이메일을 입력해주세요."),
    industry: z.string().min(1, "업종을 선택해주세요."),
    firmSize: z.string().min(1, "사업장 규모를 선택해주세요."),
    callIncluded: z.string().min(1, "1차콜 포함 여부를 선택해주세요."),
    budget: z.string().min(1, "예상 월 예산을 선택해주세요."),
    targetCpa: z.string().optional(),
    currentMethod: z.string().optional(),
    message: z.string().optional(),
    privacyAgree: z.boolean().refine((val) => val === true, "개인정보 수집 및 이용에 동의해야 합니다."),
    marketingAgree: z.boolean().default(false).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const selectClass = "flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const trustItems = [
    { icon: Clock, text: "영업일 기준 24시간 이내 회신" },
    { icon: UserCheck, text: "업종별 전문 컨설턴트 1:1 배정" },
    { icon: Gift, text: "계약 전 무료 운영 전략 제안" },
];

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "", contactPerson: "", phone: "", email: "",
            industry: "", firmSize: "", callIncluded: "", budget: "",
            targetCpa: "", currentMethod: "", message: "",
            privacyAgree: false, marketingAgree: false,
        },
    });

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.ok) setIsSubmitted(true);
            else alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
        } catch {
            alert("전송 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSubmitted) {
        return (
            <section id="contact" className="py-24 md:py-32 bg-[var(--navy)] lg:min-h-screen lg:flex lg:items-center">
                <div className="ot-container max-w-2xl w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center bg-white p-12 rounded-xl border border-[var(--slate-200)] shadow-xl"
                    >
                        <div className="w-20 h-20 bg-[var(--coral-50)] rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--coral-500)]">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-[var(--navy)] mb-4">문의가 접수되었습니다.</h2>
                        <p className="text-lg text-[var(--slate-600)] mb-8">
                            담당자가 내용 확인 후 기재해주신 연락처로<br />
                            빠르게 안내 드리겠습니다.
                        </p>
                        <Button onClick={() => setIsSubmitted(false)} variant="outline" className="border-[var(--coral-500)] text-[var(--navy)] hover:bg-[var(--coral-50)]">
                            추가 문의하기
                        </Button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-20 md:py-28 bg-[var(--navy)] lg:min-h-screen lg:flex lg:items-center">
            <div className="ot-container max-w-7xl w-full">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">

                    {/* 좌 — 안내 카피 */}
                    <div className="lg:col-span-5 mb-10 lg:mb-0">
                        <div className="eyebrow mb-4">CONTACT</div>
                        <h2 className="font-display text-4xl md:text-5xl text-white mb-6 leading-[1.2]">
                            광고주 <span className="text-gradient-coral font-semibold">문의</span>
                        </h2>
                        <p className="text-base md:text-lg text-white/75 leading-relaxed mb-10">
                            업종 전문 컨설턴트가 귀사 상황에 맞춘<br className="hidden lg:block" />
                            운영 전략을 제안드립니다.
                        </p>
                        <div className="space-y-5">
                            {trustItems.map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--coral-500)]/20 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 text-[var(--coral-400)]" />
                                    </div>
                                    <span className="text-white/85 font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 우 — 폼 */}
                    <div className="lg:col-span-7">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-7 md:p-9 rounded-xl border border-[var(--slate-200)] shadow-2xl space-y-5">

                            {/* 기본 정보 */}
                            <div>
                                <h3 className="text-sm font-bold text-[var(--coral-500)] tracking-widest mb-4">기본 정보</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="companyName" className="text-sm font-medium">회사명 <span className="text-destructive">*</span></label>
                                        <Input id="companyName" placeholder="OT MARKETING" className="h-11" {...form.register("companyName")} />
                                        {form.formState.errors.companyName && <p className="text-xs text-destructive">{form.formState.errors.companyName.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="contactPerson" className="text-sm font-medium">담당자명 <span className="text-destructive">*</span></label>
                                        <Input id="contactPerson" placeholder="홍길동 팀장" className="h-11" {...form.register("contactPerson")} />
                                        {form.formState.errors.contactPerson && <p className="text-xs text-destructive">{form.formState.errors.contactPerson.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="phone" className="text-sm font-medium">연락처 <span className="text-destructive">*</span></label>
                                        <Input id="phone" placeholder="010-1234-5678" className="h-11"
                                            {...form.register("phone")}
                                            onChange={(e) => form.setValue("phone", formatPhone(e.target.value), { shouldValidate: true })}
                                        />
                                        {form.formState.errors.phone && <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-sm font-medium">이메일 <span className="text-destructive">*</span></label>
                                        <Input id="email" type="email" placeholder="contact@company.com" className="h-11" {...form.register("email")} />
                                        {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* 마케팅 현황 */}
                            <div>
                                <h3 className="text-sm font-bold text-[var(--coral-500)] tracking-widest mb-4">마케팅 현황</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="industry" className="text-sm font-medium">업종 <span className="text-destructive">*</span></label>
                                        <select id="industry" className={selectClass} {...form.register("industry")}>
                                            <option value="">선택해주세요</option>
                                            <option value="internet">인터넷/통신 DB</option>
                                            <option value="rental">정수기/생활렌탈 DB</option>
                                            <option value="finance">주식/코인/투자 DB</option>
                                            <option value="loan">개인회생/채무조정 DB</option>
                                            <option value="realestate">부동산/분양 DB</option>
                                            <option value="medical">병의원 DB</option>
                                            <option value="etc">기타 전문 서비스 DB</option>
                                        </select>
                                        {form.formState.errors.industry && <p className="text-xs text-destructive">{form.formState.errors.industry.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="firmSize" className="text-sm font-medium">사업장 규모 <span className="text-destructive">*</span></label>
                                        <select id="firmSize" className={selectClass} {...form.register("firmSize")}>
                                            <option value="">선택해주세요</option>
                                            <option value="solo">1인 사업자</option>
                                            <option value="small">소형 (2~5명)</option>
                                            <option value="medium">중형 (6~20명)</option>
                                            <option value="large">대형 (20명 이상)</option>
                                            <option value="agency">대행사·실행사</option>
                                        </select>
                                        {form.formState.errors.firmSize && <p className="text-xs text-destructive">{form.formState.errors.firmSize.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="callIncluded" className="text-sm font-medium">1차콜 포함 여부 <span className="text-destructive">*</span></label>
                                        <select id="callIncluded" className={selectClass} {...form.register("callIncluded")}>
                                            <option value="">선택해주세요</option>
                                            <option value="included">모델 B (1차콜 포함)</option>
                                            <option value="excluded">모델 A (자체 콜팀)</option>
                                            <option value="undecided">미정 (상담 후 결정)</option>
                                        </select>
                                        {form.formState.errors.callIncluded && <p className="text-xs text-destructive">{form.formState.errors.callIncluded.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="budget" className="text-sm font-medium">월 예상 예산 <span className="text-destructive">*</span></label>
                                        <select id="budget" className={selectClass} {...form.register("budget")}>
                                            <option value="">선택해주세요</option>
                                            <option value="under_300">300만원 미만</option>
                                            <option value="300_1000">300만원 ~ 1,000만원</option>
                                            <option value="1000_3000">1,000만원 ~ 3,000만원</option>
                                            <option value="over_3000">3,000만원 이상</option>
                                        </select>
                                        {form.formState.errors.budget && <p className="text-xs text-destructive">{form.formState.errors.budget.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="targetCpa" className="text-sm font-medium">희망 목표 CPA (선택)</label>
                                        <Input id="targetCpa" placeholder="예: 30,000원" className="h-11" {...form.register("targetCpa")} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="currentMethod" className="text-sm font-medium">현재 운영 방식</label>
                                        <Input id="currentMethod" placeholder="자체운영 / 대행사 / 믹스" className="h-11" {...form.register("currentMethod")} />
                                    </div>
                                </div>
                                <div className="space-y-1.5 mt-4">
                                    <label htmlFor="message" className="text-sm font-medium">문의 내용 / 기타 요청사항</label>
                                    <Textarea id="message" placeholder="자유롭게 기재해주세요." className="h-24" {...form.register("message")} />
                                </div>
                            </div>

                            {/* 동의 */}
                            <div className="space-y-3 pt-2 border-t">
                                <div className="flex items-start space-x-3">
                                    <input type="checkbox" id="privacyAgree" className="mt-1 w-4 h-4 rounded border-gray-300" {...form.register("privacyAgree")} />
                                    <label htmlFor="privacyAgree" className="text-xs text-muted-foreground leading-snug">
                                        <span className="text-destructive font-bold">(필수)</span> 개인정보 수집 및 이용에 동의합니다.
                                        <a href="/privacy" target="_blank" className="underline ml-1">약관 보기</a>
                                    </label>
                                </div>
                                {form.formState.errors.privacyAgree && <p className="text-xs text-destructive ml-7">{form.formState.errors.privacyAgree.message}</p>}
                                <div className="flex items-start space-x-3">
                                    <input type="checkbox" id="marketingAgree" className="mt-1 w-4 h-4 rounded border-gray-300" {...form.register("marketingAgree")} />
                                    <label htmlFor="marketingAgree" className="text-xs text-muted-foreground">(선택) 마케팅 정보 수신에 동의합니다.</label>
                                </div>
                            </div>

                            {/* 버튼 */}
                            <div className="flex flex-col gap-3">
                                <Button type="submit" size="lg" className="w-full h-12 bg-[var(--coral-500)] hover:bg-[var(--coral-600)] text-white font-bold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg" disabled={isSubmitting}>
                                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />접수 중...</> : "문의 접수하기"}
                                </Button>
                                <Button variant="outline" size="lg" className="w-full h-12 border-yellow-400 hover:bg-yellow-50 text-foreground" type="button" asChild>
                                    <a href="https://open.kakao.com/o/sw2Zxm9h" target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="mr-2 h-5 w-5 text-yellow-500 fill-current" />
                                        카카오톡 오픈채팅 문의
                                    </a>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
