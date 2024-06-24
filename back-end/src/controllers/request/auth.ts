export interface SpotifyTokenRequest {
  code: string;
  redirect_uri: string;
  grant_type: "authorization_code";
}

export interface SpotifyRefreshAccessTokenRequest {
  refresh_token: string;
  grant_type: "refresh_token";
}

export interface RefreshTokenRequest {
  refreshToken?: string;
}
