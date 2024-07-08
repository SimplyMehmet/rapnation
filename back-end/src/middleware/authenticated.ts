import { NextFunction, Request, Response } from "express";
import { CookieType } from "../enums/cookie";

export const authenticatedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies[CookieType.AccessToken] as string | undefined;

  if (!accessToken) {
    res.status(401).json({ error: "No accessToken cookie found" });
    return;
  }

  res.locals.accessToken = accessToken;
  next();
};
