import { NextFunction, Request, Response } from "express";
import signinSchema from "./signInSchema";
import logger from "../../../../utils/logger";

const childLogger = logger.child({ module: "Validate Signin", version: "1" });

function validateSignin(req: Request, res: Response, next: NextFunction) {
  try {
    const value = signinSchema.safeParse(req.body);

    if (!value.success) {
      throw value.error;
    }

    childLogger.info("Validated Request");
    next();
  } catch (error) {
    childLogger.trace({ error }, "Failed to validate request");

    res
      .status(400)
      .json({ message: "Request Validation Failed", error: error });
  }
}

export default validateSignin;
