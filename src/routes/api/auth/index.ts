import { Router } from "express";
import validateSignup from "../../../middlewares/requestValidators/auth/signup/validateSignup";
import handleSignIn from "../../../handlers/auth/signin/signin";
import handleSignup from "../../../handlers/auth/signup/signup";
import validateSignin from "../../../middlewares/requestValidators/auth/signin/validateSignin";

const authRouter = Router({ mergeParams: true });

authRouter.post("/signup", validateSignup, handleSignup);
authRouter.post("/signin", validateSignin, handleSignIn);

export default authRouter;
