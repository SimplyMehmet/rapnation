import { CookieType } from "../../enums/cookie";
import { SpotifyMarket } from "../../enums/spotify";

export interface SearchQueryBody {
  q: string;
  market?: SpotifyMarket;
  limit?: number;
  offset?: number;
  [CookieType.AccessToken]: string;
}

export interface SpotifySearchArtistsQueryResponse {
  artists: {
    href: string;
    items: SpotifySearchArtistsQueryResponseItem[];
    limit: string;
    total: number;
  };
}

export interface SpotifySearchArtistsQueryResponseItem {
  images: SpotifySearchArtistsQueryResponseItemImage[];
  name: string;
}

export interface SpotifySearchArtistsQueryResponseItemImage {
  height: number;
  width: number;
  url: string;
}
