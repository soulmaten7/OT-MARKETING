import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

// STEP_108 — 사이트 모드 플래그 (production=cpa_only / 로컬=full)
// NEXT_PUBLIC_SITE_MODE 미설정 시 기본 = full (로컬 개발 안전)
const SITE_MODE = process.env.NEXT_PUBLIC_SITE_MODE || 'full'

// STEP_105 — 개발 모드 인증·구독 게이트 우회 플래그 (next.config.mjs env 통해 정적 주입)
const DEV_BYPASS_AUTH = process.env.BYPASS_AUTH_DEV === 'true'

// 인증이 필요한 라우트
const AUTH_REQUIRED_ROUTES = ["/dashboard", "/landing-pages/manage", "/subscribe"];

// 구독이 필요한 라우트 (landing_subscription_status === 'active' 요구)
const SUBSCRIPTION_REQUIRED_ROUTES = ["/landing-pages/manage"];

// cpa_only 모드에서 허용할 라우트 prefix
const CPA_ONLY_ALLOWED = ['/cpa', '/ads', '/api', '/_next']

async function checkAuth(req: NextRequest) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;

    let res = NextResponse.next({ request: req });
    const supabase = createServerClient(url, key, {
        cookies: {
            getAll() { return req.cookies.getAll(); },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
                res = NextResponse.next({ request: req });
                cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
            },
        },
    });

    const { data: { user } } = await supabase.auth.getUser();
    return { user, supabase, res };
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const host = req.headers.get("host") || "";

    // STEP_108 — cpa_only 모드: ot-marketing.kr 한정
    // otpage1.com = cpa_only 적용 안 함 (기존 랜딩페이지 동작 보존)
    if (SITE_MODE === 'cpa_only' && !host.includes('otpage1.com')) {
        if (pathname === '/') {
            return NextResponse.redirect(new URL('/cpa', req.url))
        }
        const isAllowed = CPA_ONLY_ALLOWED.some(p => pathname.startsWith(p))
        if (!isAllowed) {
            return NextResponse.redirect(new URL('/cpa', req.url))
        }
        return NextResponse.next()
    }

    // full 모드 (또는 otpage1.com): 기존 STEP_96·105 로직 그대로 보존

    // STEP_105 — 개발 모드 = 인증·구독 게이트 전부 우회
    if (DEV_BYPASS_AUTH) {
        return NextResponse.next()
    }

    // STEP_96 — 인증 보호 라우트 처리
    if (AUTH_REQUIRED_ROUTES.some((r) => pathname.startsWith(r))) {
        const auth = await checkAuth(req);
        if (!auth?.user) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // 구독 필요 라우트: landing_subscription_status 확인
        if (SUBSCRIPTION_REQUIRED_ROUTES.some((r) => pathname.startsWith(r))) {
            const { data: profile } = await auth.supabase
                .from("profiles")
                .select("landing_subscription_status")
                .eq("id", auth.user.id)
                .maybeSingle();

            if (profile?.landing_subscription_status !== "active") {
                return NextResponse.redirect(new URL("/landing-pages", req.url));
            }
        }

        return auth.res;
    }

    // /signup·/login 방문 시 이미 로그인된 경우 대시보드로 redirect
    if (pathname === "/signup" || pathname === "/login") {
        const auth = await checkAuth(req);
        if (auth?.user) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return auth?.res ?? NextResponse.next();
    }

    // /blog-sms 또는 /auth 경로 = Supabase 세션 자동 refresh
    if (pathname.startsWith("/blog-sms") || pathname.startsWith("/auth")) {
        return updateSession(req);
    }

    // STEP_85.5 — otpage1.com root → /home
    if (
        (host === "otpage1.com" || host === "www.otpage1.com") &&
        pathname === "/"
    ) {
        return NextResponse.rewrite(new URL("/home", req.url));
    }

    // ot-marketing.kr 에서 /select* 진입 → 회사 메인으로 silent redirect
    if (
        (host === "ot-marketing.kr" || host === "www.ot-marketing.kr") &&
        /^\/select\d+$/.test(pathname)
    ) {
        return NextResponse.redirect(new URL("/", req.url), 301);
    }

    // /admin 경로만 Basic Auth 검사
    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    const expectedUser = process.env.ADMIN_USER || "ot";
    const expectedPass = process.env.ADMIN_PASS || "";

    if (!expectedPass) {
        return new NextResponse("Admin area not configured. Set ADMIN_PASS env var.", {
            status: 503,
        });
    }

    const authHeader = req.headers.get("authorization") || "";
    const [scheme, encoded] = authHeader.split(" ");

    if (scheme === "Basic" && encoded) {
        try {
            const decoded = Buffer.from(encoded, "base64").toString("utf-8");
            const [user, pass] = decoded.split(":");
            if (user === expectedUser && pass === expectedPass) {
                return NextResponse.next();
            }
        } catch {
            // invalid base64 — fall through to 401
        }
    }

    return new NextResponse("Authentication required.", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="OT Marketing Admin"',
        },
    });
}

export const config = {
    matcher: [
        // 정적 파일·_next internals 제외한 모든 경로 매칭
        '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|css|js)$).*)',
    ],
};
