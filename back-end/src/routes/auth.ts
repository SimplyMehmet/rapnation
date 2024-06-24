import * as authController from "../controllers/auth";
import express, { RequestHandler, Router } from "express";

export const authRoutes = (): Router => {
  const router = express.Router();

  router.get("/login", authController.login);
  router.get(
    "/spotify/callback",
    authController.spotifyRedirect as RequestHandler
  );

  router.post("/token/refresh", authController.refreshToken as RequestHandler);
  return router;
};
