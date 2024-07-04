"use client";
import { Button } from "@/components/Button";
import { config } from "@/config";

export const LoginButton = () => {
  const loginToSpotify = () => {
    const loginUrl = config.apiURL + "auth/login";
    window.location.assign(loginUrl);
  };

  return (
    <Button onClick={loginToSpotify} bgImageUrl="/img/spotify.svg">
      <span>Click to login with spotify</span>
    </Button>
  );
};
