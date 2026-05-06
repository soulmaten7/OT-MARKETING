// 서버 컴포넌트·Route Handler 용 Supabase 클라이언트
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options),
                        );
                    } catch {
                        // Server Component 에서 set 호출 시 발생 — 안전하게 무시
                    }
                },
            },
        },
    );
}

// 환경변수 미설정 시 안전하게 null 반환 (build·preview 시 크래시 방지)
export function isSupabaseConfigured() {
    return Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
}
