import { FetchResult } from "@/app/api/types";

export const fetcher =
  <T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    body?: BodyInit | null
  ): ((url: string) => Promise<FetchResult<T>>) =>
  async (url: string) => {
    const headers = new Headers();

    if (typeof body === "string") {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, { method, body, headers });
    const responseBody = await response.json();

    if (response.status >= 400) {
      if (
        response.status === 401 &&
        typeof window !== "undefined" &&
        window.location
      ) {
        window.location.reload();
      }

      return {
        error: responseBody.error,
        status: response.status,
      };
    }

    return {
      result: responseBody,
      status: response.status,
    };
  };
