import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/setting"];

const authRoutes = ["/login"];

// TODO: 설정 확인용 임시 우회입니다. 확인 후 이 블록만 삭제해주세요.
const temporarySettingCheckRoutes = ["/setting"];
// END

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("access_token")?.value;
  // TODO: 설정 확인용 임시 우회입니다. 확인 후 이 블록만 삭제해주세요.
  const isTemporarySettingCheckRoute = temporarySettingCheckRoutes.some(
    (route) => pathname.startsWith(route),
  );

  if (isTemporarySettingCheckRoute) {
    return NextResponse.next();
  }
  //END

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
