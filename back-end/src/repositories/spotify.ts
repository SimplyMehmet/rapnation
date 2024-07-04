import axios from "axios";
import { config } from "../config/config";
import { SpotifyTokenResponse } from "../controllers/response/auth";
import {
  SpotifyRefreshAccessTokenRequest,
  SpotifyTokenRequest,
} from "../controllers/request/auth";
import { SpotifyError } from "../controllers/response/global";

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
    console.log(error);
    if (axios.isAxiosError(error)) {
      const errorDescription = (error as SpotifyError).response?.data
        .error_description;

      return errorDescription ?? error.message;
    }

    return "could not determine error";
  }
};
