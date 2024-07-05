"use client";
import { ReactElement, useState } from "react";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ProgressiveSearch } from "@/components/ProgressiveSearch";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";

export default function Page(): ReactElement {
  const searchState = useState("");
  const [searchStateVal] = searchState;
  const mutate = useSWRMutation("", fetcher("POST"));

  const searchArtists = async () => {
    console.log("should search with", searchStateVal);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100%]">
      <div className="h-[60%] max-h-[200px] min-h-fit flex flex-col justify-between items-center">
        <div>
          <div className="mb-5 text-center">
            <span className="block">
              Don&apos;t worry it is as easy as searching within spotify itself
            </span>
            <span className="block font-rokkitt">
              Just give it a little spin
            </span>
          </div>
          <ProgressiveSearch
            state={searchState}
            placeholder="Search artist"
            name="artist"
            id="artist"
            searchFunc={searchArtists}
          ></ProgressiveSearch>
        </div>

        <MusicPlayer></MusicPlayer>
      </div>
    </div>
  );
}
