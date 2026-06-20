import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken =
    request.cookies.get("accessToken")?.value;

  // auth pages
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) {
    if (accessToken) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.next();
  }

  // admin protected
  if (pathname.startsWith("/admin")) {
    if (!accessToken) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};