"use client";
import { Button } from "@/components/Button";

export const LoginButton = () => {
  const loginToSpotify = () => {
    window.location.assign("https://google.nl");
  };

  return (
    <Button onClick={loginToSpotify} bgImageUrl="/img/spotify.svg">
      <span>Click to login with spotify</span>
    </Button>
  );
};
