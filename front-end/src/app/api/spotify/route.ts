import { config } from "@/config";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

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

  const apiCall = await fetch(
    config.apiURL +
      "auth/spotify/callback?" +
      new URLSearchParams({
        code,
        state,
      })
  );

  const data = await apiCall.json();

  const expiresAt = new Date().getTime() + data.expires_in * 0.8;
  cookies().set("accessToken", data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  cookies().set("refreshToken", data.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  
  cookies().set("expiresAt", `${expiresAt}`);
  return Response.json(data);
}
