import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/setting"];

const authRoutes = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("access_token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthRoute && authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
