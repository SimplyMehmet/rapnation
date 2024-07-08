import { config } from "@/config";
import { fetcher } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";
import { SearchArtistsRequest, SearchArtistsResponse } from "./types";
import { SpotifySearchable } from "@/enums/spotify";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const cookies = headers().get("cookie");
  const bodyJson: SearchArtistsRequest = await req.json();
  if (!bodyJson.search || bodyJson.search.length < 1) {
    return NextResponse.json(
      { error: "invalid request body" },
      { status: 400 }
    );
  }

  const apiResponse = await fetcher<SearchArtistsResponse>(
    "POST",
    JSON.stringify({
      q: bodyJson.search,
      type: [SpotifySearchable.Artist],
    }),
    cookies
  )(config.apiURL + "search/artists");

  if (apiResponse.status >= 400 || apiResponse.error || !apiResponse.result) {
    return Response.json(
      { error: apiResponse.error },
      { status: apiResponse.status }
    );
  }

  return Response.json(apiResponse.result, { status: apiResponse.status });
}
