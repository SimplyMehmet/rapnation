import { randomBytes } from "crypto";
import { Request, Response } from "express";
import { config } from "../config/config";
import { URLSearchParams } from "url";
import axios, { AxiosError } from "axios";

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

export const spotifyRedirect = async (
  req: Request<
    Record<string, string>,
    Record<string, string>,
    Record<string, string>,
    { code?: string; state?: string }
  >,
  res: Response
): Promise<void> => {
  // should all be present in service instead
  const code = req.query.code ?? null;
  const state = req.query.state ?? null;

  if (state === null || code == null) {
    // should redirect to front-end
    res.redirect(
      "/#" +
        new URLSearchParams({
          error: "state_mismatch",
        }).toString()
    );
    res.status(401);
    return;
  }

  const body = {
    code: code,
    redirect_uri: config.spotify_authenticated_redirect_uri,
    grant_type: "authorization_code",
  };

  try {
    const spotifyRes = await axios.post(
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

    res.json(spotifyRes.data);
  } catch (error) {
    res.status(500);
  }
};
