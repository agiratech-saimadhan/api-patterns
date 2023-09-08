import { NextFunction, Request, Response } from "express";
import signinSchema from "./signInSchema";
import { logger } from "../../../../utils/logger";

function validateSignin(req: Request, res: Response, next: NextFunction) {
  try {
    const value = signinSchema.safeParse(req.body);

    if (!value.success) {
      throw value.error;
    }

    next();
  } catch (error) {
    logger.error({
      Path: "/auth/login",
      message: "Request Validation Failed",
      error: error,
    });

    res
      .status(400)
      .json({ message: "Request Validation Failed", error: error });
  }
}

export default validateSignin;
