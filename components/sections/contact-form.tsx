"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader2, CheckCircle, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
    companyName: z.string().min(1, "회사명을 입력해주세요."),
    contactPerson: z.string().min(1, "담당자 성함을 입력해주세요."),
    phone: z.string().min(9, "유효한 연락처를 입력해주세요."),
    email: z.string().email("유효한 이메일을 입력해주세요."),
    industry: z.string().min(1, "업종을 선택해주세요."),
    budget: z.string().min(1, "예상 월 예산을 선택해주세요."),
    targetCpa: z.string().optional(),
    currentMethod: z.string().optional(),
    message: z.string().optional(),
    privacyAgree: z.boolean().refine((val) => val === true, "개인정보 수집 및 이용에 동의해야 합니다."),
    marketingAgree: z.boolean().default(false).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            contactPerson: "",
            phone: "",
            email: "",
            industry: "",
            budget: "",
            targetCpa: "",
            currentMethod: "",
            message: "",
            privacyAgree: false,
            marketingAgree: false,
        },
    });

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        } catch (e) {
            alert("전송 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 px-4 bg-muted/30 rounded-3xl border border-border"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">문의가 접수되었습니다.</h2>
                <p className="text-lg text-muted-foreground mb-8">
                    담당자가 내용 확인 후 기재해주신 연락처로<br />
                    빠르게 안내 드리겠습니다.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    추가 문의하기
                </Button>
            </motion.div>
        );
    }

    return (
        <section id="contact" className="py-24 bg-background">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        광고주 입점 문의
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        OT MARKETING은 검증된 DB만을 제공합니다.<br />
                        귀사의 비즈니스에 딱 맞는 성과형 모델을 제안 받아보세요.
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card p-8 md:p-12 rounded-3xl border border-border shadow-sm">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold border-b pb-2 mb-6 text-accent">기본 정보</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="companyName" className="text-sm font-medium">회사명 <span className="text-destructive">*</span></label>
                                <Input id="companyName" placeholder="OT MARKETING" {...form.register("companyName")} />
                                {form.formState.errors.companyName && <p className="text-sm text-destructive">{form.formState.errors.companyName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="contactPerson" className="text-sm font-medium">담당자명 <span className="text-destructive">*</span></label>
                                <Input id="contactPerson" placeholder="홍길동 팀장" {...form.register("contactPerson")} />
                                {form.formState.errors.contactPerson && <p className="text-sm text-destructive">{form.formState.errors.contactPerson.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium">연락처 <span className="text-destructive">*</span></label>
                                <Input id="phone" placeholder="010-1234-5678" {...form.register("phone")} />
                                {form.formState.errors.phone && <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">이메일 <span className="text-destructive">*</span></label>
                                <Input id="email" type="email" placeholder="contact@company.com" {...form.register("email")} />
                                {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Marketing Info */}
                    <div className="space-y-4 pt-6">
                        <h3 className="text-xl font-semibold border-b pb-2 mb-6 text-accent">마케팅 현황</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="industry" className="text-sm font-medium">업종 선택 <span className="text-destructive">*</span></label>
                                <select
                                    id="industry"
                                    className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...form.register("industry")}
                                >
                                    <option value="">선택해주세요</option>
                                    <option value="internet">인터넷/통신 DB</option>
                                    <option value="rental">정수기/생활렌탈 DB</option>
                                    <option value="finance">주식/코인/투자 DB</option>
                                    <option value="loan">개인회생/채무조정 DB</option>
                                    <option value="realestate">부동산/분양 DB</option>
                                    <option value="medical">병의원 DB</option>
                                    <option value="etc">기타 전문 서비스 DB</option>
                                </select>
                                {form.formState.errors.industry && <p className="text-sm text-destructive">{form.formState.errors.industry.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="budget" className="text-sm font-medium">월 예상 예산 <span className="text-destructive">*</span></label>
                                <select
                                    id="budget"
                                    className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...form.register("budget")}
                                >
                                    <option value="">선택해주세요</option>
                                    <option value="under_300">300만원 미만</option>
                                    <option value="300_1000">300만원 ~ 1,000만원</option>
                                    <option value="1000_3000">1,000만원 ~ 3,000만원</option>
                                    <option value="over_3000">3,000만원 이상</option>
                                </select>
                                {form.formState.errors.budget && <p className="text-sm text-destructive">{form.formState.errors.budget.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="targetCpa" className="text-sm font-medium">희망 목표 CPA (선택)</label>
                                <Input id="targetCpa" placeholder="예: 30,000원" {...form.register("targetCpa")} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="currentMethod" className="text-sm font-medium">현재 운영 방식</label>
                                <Input id="currentMethod" placeholder="자체운영 / 대행사 / 믹스 등" {...form.register("currentMethod")} />
                            </div>
                        </div>
                        <div className="space-y-2 mt-4">
                            <label htmlFor="message" className="text-sm font-medium">문의 내용 / 기타 요청사항</label>
                            <Textarea id="message" placeholder="자유롭게 기재해주세요." className="h-32" {...form.register("message")} />
                        </div>
                    </div>

                    {/* Agreements */}
                    <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-start space-x-3">
                            <input type="checkbox" id="privacyAgree" className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" {...form.register("privacyAgree")} />
                            <label htmlFor="privacyAgree" className="text-sm text-muted-foreground leading-snug">
                                <span className="text-destructive font-bold">(필수)</span> 개인정보 수집 및 이용에 동의합니다. 귀하는 본 동의를 거부할 권리가 있으나, 거부 시 문의 접수가 불가능합니다.
                                <br /><a href="/privacy" target="_blank" className="underline text-xs">약관 상세보기</a>
                            </label>
                        </div>
                        {form.formState.errors.privacyAgree && <p className="text-sm text-destructive ml-7">{form.formState.errors.privacyAgree.message}</p>}

                        <div className="flex items-start space-x-3">
                            <input type="checkbox" id="marketingAgree" className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" {...form.register("marketingAgree")} />
                            <label htmlFor="marketingAgree" className="text-sm text-muted-foreground leading-snug">
                                (선택) 마케팅 정보 수신에 동의합니다.
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button type="submit" size="lg" className="w-full text-lg h-14 bg-accent hover:bg-accent/90 text-white" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    접수 중...
                                </>
                            ) : (
                                "문의 접수하기"
                            )}
                        </Button>

                        {/* Kakao Button Placeholder */}
                        <Button variant="outline" size="lg" className="w-full text-lg h-14 border-yellow-400 hover:bg-yellow-50 text-foreground" type="button" asChild>
                            <a href="https://open.kakao.com/o/sw2Zxm9h" target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="mr-2 h-5 w-5 text-yellow-500 fill-current" />
                                카카오톡 오픈채팅 문의
                            </a>
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
