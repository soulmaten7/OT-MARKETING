import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const host = req.headers.get("host") || "";

    // otpage1.com root → /home (보광 LP 보존)
    if (
        (host === "otpage1.com" || host === "www.otpage1.com") &&
        pathname === "/"
    ) {
        return NextResponse.rewrite(new URL("/home", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|css|js)$).*)',
    ],
};
