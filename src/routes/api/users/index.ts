import { Router } from "express";
import passport from "passport";
import getCurrentUser from "../../../handlers/users/getCurrentUser/getCurrentUser";
import getUser from "../../../handlers/users/getUser/getUser";

const userRouter = Router({ mergeParams: true });

userRouter.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

userRouter.get("/:id", getUser);

export default userRouter;
