import { SearchArtistsResponse } from "../controllers/response/search";
import { searchArtists } from "../repositories/spotify/spotify";
import { SearchQueryBody } from "../repositories/spotify/types";

export const searchQuerySpotify = async (
  body: SearchQueryBody
): Promise<SearchArtistsResponse | string> => {
  const result = await searchArtists(body);
  if (typeof result === "string") {
    return result;
  }

  const mappedResult = result.artists.items.map((i) => ({
    name: i.name,
    images: i.images.sort((a, b) => a.height - b.height).map((i) => i.url),
  }));

  return {
    artists: mappedResult,
  };
};
