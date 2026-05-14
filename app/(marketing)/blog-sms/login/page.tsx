import { redirect } from "next/navigation";

// 통합 로그인으로 308 redirect (STEP_96)
export default function BlogSmsLoginRedirect() {
    redirect("/login");
}
