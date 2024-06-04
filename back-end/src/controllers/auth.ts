import { randomBytes } from "crypto";
import { Request, Response } from "express";
import { config } from "../config/config";

export const login = (_req: Request, res: Response): void => {
  const state = randomBytes(8).toString("hex");
  const scope = "user-read-private user-read-email";

  console.log(config.spotify_client_id);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      JSON.stringify({
        response_type: "code",
        client_id: config.spotify_client_id,
        scope: scope,
        redirect_uri: config.spotify_redirect_uri,
        state: state,
      })
  );
};
