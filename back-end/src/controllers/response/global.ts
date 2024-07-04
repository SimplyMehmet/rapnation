import { AxiosError } from "axios";

export interface ErrorResponse {
  error: string;
}

export type SpotifyError = AxiosError<{
  error?: string;
  error_description?: string;
}>;
