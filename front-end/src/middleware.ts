import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { fetcher } from "@/lib/fetcher";
import { config as env } from "@/config";
import { RefreshTokenResponse } from "@/app/api/auth/spotify/types";
import { CookieType } from "./enums/cookie";

const unAuthorizedResponse = () => {
  const response = NextResponse.json(
    { error: "authentication failed" },
    { status: 401 }
  );
  response.cookies.delete(CookieType.AccessToken);
  response.cookies.delete(CookieType.RefreshToken);
  response.cookies.delete(CookieType.ExpiresAt);
  return response;
};

export async function middleware(request: NextRequest) {
  const refreshTokenCookie = request.cookies.get(CookieType.RefreshToken);
  const expiresAtCookie = request.cookies.get(CookieType.ExpiresAt);

  if (!expiresAtCookie?.value || !refreshTokenCookie?.value) {
    return unAuthorizedResponse();
  }

  if (expiresAtCookie?.value && refreshTokenCookie?.value) {
    const expiresAtUnix = parseInt(expiresAtCookie.value);

    if (isNaN(expiresAtUnix)) {
      return unAuthorizedResponse();
    }

    if (expiresAtUnix < new Date().getTime()) {
      const tokenResponse = await fetcher<RefreshTokenResponse>(
        "POST",
        JSON.stringify({
          refreshToken: refreshTokenCookie.value,
        })
      )(env.apiURL + "auth/token/refresh");

      if (
        tokenResponse.error ||
        tokenResponse.status > 400 ||
        !tokenResponse.result
      ) {
        return unAuthorizedResponse();
      }

      const expiresAtUnix =
        new Date().getTime() + tokenResponse.result.expires_in * 800;
      const response = NextResponse.next();
      response.cookies.set(
        CookieType.AccessToken,
        tokenResponse.result.access_token
      );
      response.cookies.set(CookieType.ExpiresAt, `${expiresAtUnix}`);
      return response;
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: "/((?!api/auth)api.*)",
};
