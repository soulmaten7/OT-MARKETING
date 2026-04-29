import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host") || "";

  // otpage1.com root → /select1 (개인회생 랜딩, URL 변경 X)
  if (
    (host === "otpage1.com" || host === "www.otpage1.com") &&
    pathname === "/"
  ) {
    return NextResponse.rewrite(new URL("/select1", req.url));
  }

  // ot-marketing.kr 에서 /select* 진입 → 회사 메인으로 silent redirect (흔적 제거)
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
    "/",              // otpage1.com root rewrite
    "/select(.*)",    // ot-marketing.kr select* → root redirect
    "/admin/:path*",  // admin Basic Auth
  ],
};
