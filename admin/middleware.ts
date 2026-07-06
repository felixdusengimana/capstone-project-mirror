import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const unAuthorizedRoutes = ["/"];

  const authorizedRoutes = ["/dashboard", "/payouts", "/transactions"];

  const pathname = request.nextUrl.pathname;
  const tokenCookie = request.cookies.get("token");

  if (tokenCookie?.value && unAuthorizedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/dashboard`, request.url));
  }

  if (!tokenCookie?.value && authorizedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
