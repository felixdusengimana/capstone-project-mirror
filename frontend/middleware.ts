import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const unAuthorizedRoutes = [
    "/login",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ];

  const authorizedRoutes = ["/join"];

  const extraAuthorized = [
    "/resolve",
    "/dashboard",
    "/ad",
    "/payouts",
    "/settings",
    "/supporters",
  ];

  const pathname = request.nextUrl.pathname;
  const tokenCookie = request.cookies.get("token");
  const passedCheckCookie = request.cookies.get("pesatoneMiddleMan");

  if (tokenCookie?.value && unAuthorizedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/resolve`, request.url));
  }

  if (
    !tokenCookie?.value &&
    (authorizedRoutes.includes(pathname) || extraAuthorized.includes(pathname))
  ) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  const canAccessAdminPages = passedCheckCookie?.value === "true";

  if (!canAccessAdminPages && extraAuthorized.includes(pathname)) {
    return NextResponse.redirect(new URL(`/resolve`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
