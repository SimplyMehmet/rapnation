import { SpotifyMarket, SpotifySearchable } from "../../enums/spotify";

export interface SearchQueryRequest {
  q: string;
  type: SpotifySearchable[];
  market?: SpotifyMarket;
  limit?: number;
  offset?: number;
}
