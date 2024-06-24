"use client";
import { RedirectType, redirect, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { AuthenticationResponse } from "@/app/api/spotify/types";
import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";

export default function Page() {
  const searchParams = useSearchParams();
  const spotifyAuthCode = searchParams.get("code");
  const spotifyAuthState = searchParams.get("state");

  if (!spotifyAuthCode || !spotifyAuthState) {
    redirect("/login", RedirectType.replace);
  }

  const { data, error, isLoading } = useSWR<AuthenticationResponse>(
    "/api/spotify?" +
      new URLSearchParams({
        code: spotifyAuthCode,
        state: spotifyAuthState,
      }),
    fetcher
  );

  if (error) {
    return <div>Errored: {JSON.stringify(error)}</div>;
  }

  if (!isLoading && data) {
    redirect("/search");
  }

  return (
    <div className="h-lvh flex items-center justify-center">
      <span>Authenticating...</span>
    </div>
  );
}
