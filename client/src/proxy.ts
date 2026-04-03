import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Session cookie check
  // Better Auth এর cookie name → "better-auth.session_token"
  const sessionToken = request.cookies.get(
    "better-auth.session_token",
  )?.value;

  // ── Admin routes protect ──
  if (pathname.startsWith("/admin")) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Auth routes → already logged in হলে redirect ──
  if (pathname === "/login" || pathname === "/register") {
    if (sessionToken) {
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