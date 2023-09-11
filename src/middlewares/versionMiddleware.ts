import { NextFunction, Request, RequestHandler, Response } from "express";
import logger from "../utils/logger";

const childLogger = logger.child({ module: "Version Middleware" });

export const versionMiddleware = (version: number): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestVersion = parseInt(req.params.version.substring(1));

    if (typeof requestVersion !== "number") {
      childLogger.error("Invalid API version requested.");
      return next(new Error("Invalid API version requested."));
    }

    if (requestVersion >= version) {
      childLogger.info(`Forwarding Request to version ${version} API`);

      childLogger.info(`Request version: ${requestVersion}`);
      return next();
    }

    return next("route");
  };
};
