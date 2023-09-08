import { Request, RequestHandler, Response } from "express";

export const versionMiddleware = (version: number): RequestHandler => {
  return (req: Request, res: Response, next) => {
    const requestVersion = parseInt(req.params.version.substring(1));

    if (typeof requestVersion !== "number") {
      return next(new Error("Invalid API version requested."));
    }

    if (requestVersion >= version) {
      return next();
    }

    return next("route");
  };
};
