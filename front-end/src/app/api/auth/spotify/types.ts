export type AuthenticationResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

export type RefreshTokenResponse = {
  access_token: string;
  expires_in: number;
};
