import * as authController from "../controllers/auth";
import express, { RequestHandler, Router } from "express";

export const authRoutes = (): Router => {
  const router = express.Router();

  //should write middleware to check state
  router.get("/login", authController.login);
  router.get(
    "/spotify/callback",
    authController.spotifyRedirect as RequestHandler
  );
  return router;
};
