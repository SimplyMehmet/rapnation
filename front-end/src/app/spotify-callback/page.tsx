"use client";
import { RedirectType, redirect, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { AuthenticationResponse } from "@/app/api/auth/spotify/types";
import { fetcher } from "@/lib/fetcher";

export default function Page() {
  const searchParams = useSearchParams();
  const spotifyAuthCode = searchParams.get("code");
  const spotifyAuthState = searchParams.get("state");

  if (!spotifyAuthCode || !spotifyAuthState) {
    redirect("/login", RedirectType.replace);
  }

  const { data, isLoading } = useSWR(
    "/api/auth/spotify?" +
      new URLSearchParams({
        code: spotifyAuthCode,
        state: spotifyAuthState,
      }),
    fetcher<AuthenticationResponse>("GET")
  );

  if (!isLoading && data?.error) {
    return <div>Errored: {data.error}</div>;
  }

  if (!isLoading && data?.result) {
    redirect("/dashboard/search");
  }

  return (
    <div className="h-lvh flex items-center justify-center">
      <span>Authenticating...</span>
    </div>
  );
}
