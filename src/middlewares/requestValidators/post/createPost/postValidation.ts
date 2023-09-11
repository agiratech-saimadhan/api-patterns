import { NextFunction, Request, Response } from "express";
import logger from "../../../../utils/logger";
import postValidationSchema from "./postSchema";

const childLogger = logger.child({
  module: "Validate Post Creation",
  version: "1",
});

function validateCreatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const value = postValidationSchema.safeParse(req.body);

    if (!value.success) {
      throw value.error;
    }

    childLogger.info("Valid Request");
    next();
  } catch (error) {
    childLogger.trace({ error }, "Invalid request");

    res
      .status(400)
      .json({ message: "Request Validation Failed", error: error });
  }
}

export default validateCreatePost;
