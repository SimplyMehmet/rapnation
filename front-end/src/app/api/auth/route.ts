import { CookieType } from "@/enums/cookie";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(_req: NextRequest): Promise<Response> {
  cookies().delete(CookieType.RefreshToken);
  cookies().delete(CookieType.AccessToken);
  cookies().delete(CookieType.ExpiresAt);
  return Response.json({ message: "loggedOut" }, { status: 200 });
}
