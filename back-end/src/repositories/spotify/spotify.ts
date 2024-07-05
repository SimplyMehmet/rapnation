import axios from "axios";
import { config } from "../../config/config";
import { SpotifyTokenResponse } from "../../controllers/response/auth";
import {
  SpotifyRefreshAccessTokenRequest,
  SpotifyTokenRequest,
} from "../../controllers/request/auth";
import { SpotifyError } from "../../controllers/response/global";
import { SpotifyMarket, SpotifySearchable } from "../../enums/spotify";
import { SearchQueryBody, SpotifySearchArtistsQueryResponse } from "./types";
import { SearchQueryRequest } from "../../controllers/request/search";

export const getAccessToken = async (
  code: string
): Promise<SpotifyTokenResponse | string> => {
  const body: SpotifyTokenRequest = {
    code: code,
    redirect_uri: config.spotify_callback_uri,
    grant_type: "authorization_code",
  };

  try {
    const spotifyRes = await axios.post<SpotifyTokenResponse>(
      "https://accounts.spotify.com/api/token",
      body,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              config.spotify_client_id + ":" + config.spotify_client_secret
            ).toString("base64"),
        },
      }
    );

    return spotifyRes.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorDescription = (error as SpotifyError).response?.data
        .error_description;
      return errorDescription ?? error.message;
    }

    return "could not determine error";
  }
};

export const refreshAccessToken = async (
  token: string
): Promise<SpotifyTokenResponse | string> => {
  const body: SpotifyRefreshAccessTokenRequest = {
    refresh_token: token,
    grant_type: "refresh_token",
  };

  try {
    const spotifyRes = await axios.post<SpotifyTokenResponse>(
      "https://accounts.spotify.com/api/token",
      body,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              config.spotify_client_id + ":" + config.spotify_client_secret
            ).toString("base64"),
        },
      }
    );

    return spotifyRes.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorDescription = (error as SpotifyError).response?.data
        .error_description;

      return errorDescription ?? error.message;
    }

    return "could not determine error";
  }
};

export const searchArtists = async ({
  q,
  market = SpotifyMarket.GB,
  limit = 50,
  offset = 0,
  accessToken,
}: SearchQueryBody): Promise<SpotifySearchArtistsQueryResponse | string> => {
  const body: SearchQueryRequest = {
    q,
    limit,
    market,
    offset,
    type: [SpotifySearchable.Artist],
  };

  try {
    const searchParams = new URLSearchParams(Object.entries(body)).toString();

    const spotifyRes = await axios.get<SpotifySearchArtistsQueryResponse>(
      "https://api.spotify.com/v1/search?" + searchParams,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return spotifyRes.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.cause, error.message, error.response?.data);
      const errorDescription = (error as SpotifyError).response?.data
        .error_description;

      return errorDescription ?? error.message;
    }

    return "could not determine error";
  }
};
