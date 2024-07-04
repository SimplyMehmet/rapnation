import express, { Router } from "express";
import * as healthController from "../controllers/health";

export const healthRoutes = (): Router => {
  const router = express.Router();
  router.get("", healthController.health);

  return router;
};
