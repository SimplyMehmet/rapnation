import { randomBytes } from "crypto";
import { Request, Response } from "express";
import { config } from "../config/config";
import { URLSearchParams } from "url";
import {
  authenticateSpotifyAccount,
  refreshSpotifyAccessToken,
} from "../services/auth";
import { RefreshTokenRequest } from "./request/auth";
import { SpotifyRedirectQueryParams } from "./params/auth";
import { SpotifyTokenResponse } from "./response/auth";
import { ErrorResponse } from "./response/global";

export const login = (_req: Request, res: Response): void => {
  const scope = "user-read-email";
  const params = {
    response_type: "code",
    client_id: config.spotify_client_id,
    scope: scope,
    redirect_uri: config.spotify_callback_uri,
    state: randomBytes(8).toString("hex"),
  };

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams(params).toString()
  );
};

export const refreshToken = async (
  req: Request<
    Record<string, string>,
    Record<string, string>,
    RefreshTokenRequest
  >,
  res: Response<SpotifyTokenResponse | ErrorResponse>
): Promise<void> => {
  const refreshToken = req.body.refreshToken ?? null;
  if (!refreshToken) {
    res.status(401).json({ error: "refresh token not found" });
    return;
  }

  const result = await refreshSpotifyAccessToken(refreshToken);
  if (typeof result === "string") {
    res.status(500).json({ error: result });
    return;
  }

  res.status(200).json(result);
};

export const spotifyRedirect = async (
  req: Request<
    Record<string, string>,
    Record<string, string>,
    Record<string, string>,
    SpotifyRedirectQueryParams
  >,
  res: Response<SpotifyTokenResponse | ErrorResponse>
): Promise<void> => {
  const code = req.query.code ?? null;
  const state = req.query.state ?? null;

  if (state === null || code === null) {
    res.status(401).json({ error: "authentication failed" });
    return;
  }
  const result = await authenticateSpotifyAccount(code);

  if (typeof result === "string") {
    res.status(500).json({ error: result });
    return;
  }

  res.status(200).json(result);
};
