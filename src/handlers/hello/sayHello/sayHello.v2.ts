import { Request, Response } from "express";
import logger from "../../../utils/logger";

function sayHelloV2(req: Request, res: Response) {
  logger.info(
    { module: "Say Hello", Version: "2" },
    "Responded with Hello from V2"
  );
  res.status(200).json({ message: "Hello from V2!" });
}

export default sayHelloV2;
