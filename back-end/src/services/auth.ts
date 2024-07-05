import { SpotifyTokenResponse } from "../controllers/response/auth";
import { getAccessToken, refreshAccessToken } from "../repositories/spotify/spotify";

export const authenticateSpotifyAccount = async (
  code: string
): Promise<SpotifyTokenResponse | string> => {
  return getAccessToken(code);
};

export const refreshSpotifyAccessToken = async (
  token: string
): Promise<SpotifyTokenResponse | string> => {
  return refreshAccessToken(token);
};
