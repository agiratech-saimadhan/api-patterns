import { Request, Response } from "express";
import logger from "../../../utils/logger";

function sayHello(req: Request, res: Response) {
  logger.info(
    { module: "Say Hello", version: "1" },
    "Responded with Hello from V1"
  );
  res.status(200).json({ message: "Hello!" });
}

export default sayHello;
