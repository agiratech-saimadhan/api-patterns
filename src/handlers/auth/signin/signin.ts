import { Request, Response } from "express";
import User from "../../../data/models/users";
import { logger } from "../../../utils/logger";
import validatePassword from "../../../utils/auth/validatePassword";
import issueToken from "../../../utils/auth/issueToken";

async function handleSignIn(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).select("+hash +salt");

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isValidPassword = validatePassword(password, user.hash, user.salt);

      if (!isValidPassword) {
        res.status(401).json({ message: "Invalid password" });
      }

      const { access_token, expiresIn } = issueToken(user);

      res.status(200).json({
        message: "User Authenticated",
        user: { id: user._id, name: user.name, email: user.email },
        access_token,
        expiresIn,
      });
    }
  } catch (error) {
    logger.error({ path: "/auth/signin", error });
    res.status(500).json({ message: "Internal server error" });
  }
}

export default handleSignIn;
