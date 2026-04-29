"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 text-green-600 animate-fade-in-up">
                <CheckCircle className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">문의가 성공적으로 접수되었습니다</h1>
            <p className="text-xl text-muted-foreground max-w-xl mb-12">
                기재해주신 연락처로 담당자가 배정되어 24시간 이내에 연락드릴 예정입니다.<br />
                잠시만 기다려주세요.
            </p>
            <div className="flex gap-4">
                <Button size="lg" asChild>
                    <Link href="/">메인으로 돌아가기</Link>
                </Button>
            </div>
        </div>
    );
}
