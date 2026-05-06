import { redirect } from "next/navigation";

// 옛 라우트 = 새 /landing-pages 로 영구 redirect
// 사장 진단 (5/6): /blog-sms 하위에 박혀있어 분리 안 됨 → /landing-pages 별도 풀 페이지로 이동
export default function LegacyPreRegisterRedirect() {
    redirect("/landing-pages");
}
