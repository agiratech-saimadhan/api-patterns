import { Request, Response } from "express";
import { logger } from "../../../utils/logger";
import User from "../../../data/models/users";

async function getCurretUser(req: Request, res: Response) {
  const { id } = req.user;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User must be Authenticated" });
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    logger.error({ path: "api/users/me", error });
    res.status(500).json({ message: "Internal server error" });
  }
}

export default getCurretUser;
