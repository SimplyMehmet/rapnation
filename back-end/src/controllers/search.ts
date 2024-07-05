import { Request, Response } from "express";
import { searchQuerySpotify } from "../services/search";
import { SearchQueryRequest } from "./request/search";
import { SearchArtistsResponse } from "./response/search";
import { ErrorResponse } from "./response/global";

export const queryArtists = async (
  req: Request<
    Record<string, string>,
    Record<string, string>,
    SearchQueryRequest
  >,
  res: Response<SearchArtistsResponse | ErrorResponse, { accessToken: string }>
): Promise<void> => {
  const searchResult = await searchQuerySpotify({
    ...req.body,
    accessToken: res.locals.accessToken,
  });

  if (typeof searchResult === "string") {
    res.status(500).json({ error: searchResult });
    return;
  }

  res.status(200).json(searchResult);
  return;
};
