import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;


 const  accessToken = request.cookies.get("accessToken")!.value
  // ── Admin routes protect ──
  if (pathname.startsWith("/admin")) {
    if (!accessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Auth routes → already logged in হলে redirect ──
  if (pathname === "/login" || pathname === "/register") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/register",
  ],
};