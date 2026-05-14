import { redirect } from "next/navigation";

// 통합 회원가입으로 308 redirect (STEP_96)
export default function BlogSmsSignupRedirect() {
    redirect("/signup");
}
