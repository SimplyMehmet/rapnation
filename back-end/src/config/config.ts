export const config = {
  spotify_client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
  spotify_client_secret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
  spotify_callback_uri: process.env.SPOTIFY_CALLBACK_URI ?? "",
  spotify_authenticated_redirect_uri:
    process.env.SPOTIFY_AUTHENTICATED_REDIRECT_URI ?? "",
};
