import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export function GET() {
    return NextResponse.json({
        BYPASS_AUTH_DEV: process.env.BYPASS_AUTH_DEV,
        NEXT_PUBLIC_DEV_BYPASS_AUTH: process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH,
        NODE_ENV: process.env.NODE_ENV,
    })
}
