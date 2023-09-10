import { Request, Response } from "express";
import User from "../../../data/models/users";
import generatePasswordHash from "../../../utils/auth/generatePasswordHash";
import issueToken from "../../../utils/auth/issueToken";
import logger from "../../../utils/logger";

async function handleSignup(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const { hash, salt } = generatePasswordHash(password);

  const newUser = new User({
    name: name,
    email: email,
    hash: hash,
    salt: salt,
  });

  try {
    const user = await newUser.save();

    const { access_token, expiresIn } = issueToken(user);

    logger.info(
      { module: "Create User", version: "1", userId: user._id },
      "User Created"
    );

    res.status(200).json({
      message: "New User Created",
      user: { id: user._id, name: user.name, email: user.email },
      access_token,
      expiresIn,
    });
  } catch (error) {
    logger.trace(
      { module: "Create User", version: "1", error },
      "Cannot Create User"
    );

    res.status(500).json({ message: "Internal server error" });
  }
}
export default handleSignup;
