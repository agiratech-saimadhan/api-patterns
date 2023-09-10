import { Request, Response } from "express";
import User from "../../../data/models/users";
import logger from "../../../utils/logger";

const childLogger = logger.child({ module: "Get User", version: "1" });

async function getUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      childLogger.info({ userId: user._id }, "Retreived User");
      res.status(200).json({ user });
    }
  } catch (error) {
    childLogger.trace({ error }, "Failed to retreive data");
    res.status(500).json({ message: "Internal server error" });
  }
}

export default getUser;
