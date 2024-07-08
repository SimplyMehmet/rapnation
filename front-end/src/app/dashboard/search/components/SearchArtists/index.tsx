"use client";

import { SearchArtistsResponse } from "@/app/api/search/types";
import { ProgressiveSearch } from "@/components/ProgressiveSearch";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

export const SearchArtists = () => {
  const searchState = useState("");
  const [searchStateVal] = searchState;
  const { trigger: searchArtistsApiCall, data: artistData } = useSWRMutation(
    "/api/search",
    fetcher<SearchArtistsResponse>(
      "POST",
      JSON.stringify({
        search: searchStateVal,
      })
    )
  );

  const searchArtists = async () => {
    await searchArtistsApiCall();
  };

  const onSelect = (data: string) => {};

  return (
    <ProgressiveSearch
      state={searchState}
      placeholder="Search artist"
      name="artist"
      id="artist"
      searchFunc={searchArtists}
      data={artistData?.result?.artists.map((a) => ({
        title: a.name,
        iconUrl: a.images.find(() => true) ?? "/img/placeholder/album.svg",
      }))}
      onSelect={onSelect}
    ></ProgressiveSearch>
  );
};
