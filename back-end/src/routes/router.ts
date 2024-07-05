import express from "express";
import { authRoutes } from "./auth";
import { healthRoutes } from "./health";
import { searchRoutes } from "./search";

const r = express.Router();
r.use((req, _res, next) => {
  console.log(req.url);
  next();
});

r.use("/health", healthRoutes());
r.use("/auth", authRoutes());
r.use("/search", searchRoutes());

export const router = r;
