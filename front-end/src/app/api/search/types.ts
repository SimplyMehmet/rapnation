export interface SearchArtistsResponse {
  artists: SearchArtistsResponseArtist[];
}

export interface SearchArtistsResponseArtist {
  name: string;
  images: string[];
}

export interface SearchArtistsRequest {
  search?: string;
}
