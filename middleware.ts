import { NextRequest, NextResponse } from "next/server";

/**
 * Basic Auth middleware — /admin/* 경로 보호
 *
 * 환경변수 설정 (Vercel Dashboard → Settings → Environment Variables):
 *   ADMIN_USER   — 기본값: "ot"
 *   ADMIN_PASS   — 반드시 설정 (기본값 비어 있음 = 접근 불가)
 *
 * 로컬 개발 시 .env.local 파일에 동일 변수 설정.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin 경로만 검사
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const expectedUser = process.env.ADMIN_USER || "ot";
  const expectedPass = process.env.ADMIN_PASS || "";

  // ADMIN_PASS 미설정 시 접근 차단 (보안)
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

  // 인증 실패 → 브라우저 기본 로그인 창 띄우기
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="OT Marketing Admin"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
