import * as authController from "../controllers/auth";
import express, { Router } from "express";


export const authRoutes = (): Router => {
  const router = express.Router();
  router.get("/login", authController.login);

  return router;
};
