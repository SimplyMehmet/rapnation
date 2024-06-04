import express from "express";
import { authRoutes } from "./auth";
import { healthRoutes } from "./health";

const r = express.Router();
r.use("/health", healthRoutes());
r.use("/auth", authRoutes());

export const router = r;
