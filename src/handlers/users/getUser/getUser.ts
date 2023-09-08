import { Request, Response } from "express";
import User from "../../../data/models/users";
import { logger } from "../../../utils/logger";

async function getUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    logger.error({ path: `api/users/${id}`, error });
    res.status(500).json({ message: "Internal server error" });
  }
}

export default getUser;
