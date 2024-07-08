import { ReactElement } from "react";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SearchArtists } from "./components/SearchArtists";

export default function Page(): ReactElement {
  return (
    <div className="flex flex-col justify-center items-center h-[100%]">
      <div className="h-[60%] max-h-[200px] min-h-fit flex flex-col justify-between items-center">
        <div>
          <div className="mb-5 text-center">
            <span className="block">
              Don&apos;t worry it is as easy as searching within spotify itself
            </span>
            <span className="block font-rokkitt">
              Just give it a little spin and we&apos;ll find a rap song based on
              the artist
            </span>
          </div>
          <SearchArtists />
        </div>

        <MusicPlayer></MusicPlayer>
      </div>
    </div>
  );
}
