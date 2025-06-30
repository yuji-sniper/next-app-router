import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/blog/:path*"],
}

export default function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.includes(".")) {
    console.log("ここでミドルウェア");
  }

  return NextResponse.next();
}
