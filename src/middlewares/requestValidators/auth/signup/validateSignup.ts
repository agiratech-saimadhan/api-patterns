import { NextFunction, Request, Response } from "express";
import signupSchema from "./signupSchema";
import logger from "../../../../utils/logger";

const childLogger = logger.child({ module: "Validate Signup", version: "1" });

function validateSignup(req: Request, res: Response, next: NextFunction) {
  try {
    const value = signupSchema.safeParse(req.body);

    if (!value.success) {
      throw value.error;
    }

    childLogger.info("Validated Request");
    next();
  } catch (error) {
    childLogger.trace({ error }, "Failed to validate request");
    res.status(400).json({ message: "Request Validation Failed", error });
  }
}

export default validateSignup;
