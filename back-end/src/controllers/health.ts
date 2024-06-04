import { Request, Response } from "express";

export const health = (_: Request, res: Response) => {
  res.json({ message: "ok" });
  res.status(200);
};
