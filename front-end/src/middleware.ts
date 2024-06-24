import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { config as env } from "@/config";

export function middleware(request: NextRequest) {
  const accessTokenCookie = request.cookies.get("accessToken");
  const onAnonymousRoute = ["/login", "/spotify-callback"].some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (onAnonymousRoute) {
    if (accessTokenCookie) {
      return NextResponse.redirect(env.host + "search");
    }

    return NextResponse.next();
  }

  // all other routes
  if (!accessTokenCookie) {
    return NextResponse.redirect(env.host + "login");
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
