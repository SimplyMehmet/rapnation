import express, { RequestHandler, Router } from "express";
import { queryArtists } from "../controllers/search";
import { authenticatedRoute } from "../middleware/authenticated";
import { SearchQueryRequest } from "../controllers/request/search";
import { SearchArtistsResponse } from "../controllers/response/search";

export const searchRoutes = (): Router => {
  const router = express.Router();
  router.post(
    "/artists",
    authenticatedRoute,
    queryArtists as RequestHandler<
      Record<string, string>,
      SearchArtistsResponse,
      SearchQueryRequest,
      Record<string, string>,
      { accessToken: string }
    >
  );
  return router;
};
