import { config } from "@/config";
import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { AuthenticationResponse } from "./types";
import { CookieType } from "@/enums/cookie";

export async function GET(req: NextRequest): Promise<Response> {
  const { nextUrl } = req;
  const code = nextUrl.searchParams.get("code");
  const state = nextUrl.searchParams.get("state");

  if (!code || !state) {
    return Response.json({ error: "Internal server error" }, { status: 400 });
  }

  if (typeof code !== "string" || typeof state !== "string") {
    return Response.json({ error: "Params invalid" }, { status: 400 });
  }

  const response = await fetcher<AuthenticationResponse>("GET")(
    config.apiURL +
      "auth/spotify/callback?" +
      new URLSearchParams({
        code,
        state,
      })
  );

  if (response.error || !response.result) {
    return Response.json(response, { status: response.status });
  }

  const expiresAt = new Date().getTime() + response.result.expires_in * 800;
  cookies().set(CookieType.AccessToken, response.result.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  cookies().set(CookieType.RefreshToken, response.result.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  cookies().set(CookieType.ExpiresAt, `${expiresAt}`);
  return Response.json(response);
}
