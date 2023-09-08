import { NextFunction, Request, Response } from "express";
import signupSchema from "./signupSchema";
import { logger } from "../../../../utils/logger";

function validateSignup(req: Request, res: Response, next: NextFunction) {
  try {
    const value = signupSchema.safeParse(req.body);

    if (!value.success) {
      throw value.error;
    }

    next();
  } catch (error) {
    logger.error({
      path: "auth/signup",
      message: "Request Validation Failed",
      error: error,
    });

    res.status(400).json({ message: "Request Validation Failed", error });
  }
}

export default validateSignup;
