import { Router } from "express";
import getAllPosts from "../../../handlers/posts/getAllPosts/getAllPosts";
import getPost from "../../../handlers/posts/getPost/getPost";
import createPost from "../../../handlers/posts/createPost/createPost";
import updatePost from "../../../handlers/posts/updatePost/updatePost";
import passport from "passport";
import deletePost from "../../../handlers/posts/deletePost/deletePost";
import likePost from "../../../handlers/posts/likePost/likePost";
import validateCreatePost from "../../../middlewares/requestValidators/post/createPost/postValidation";

const postRouter = Router({ mergeParams: true });

postRouter.get("/", getAllPosts);

postRouter.get("/:id", getPost);

postRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateCreatePost,
  createPost
);

postRouter.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updatePost
);

postRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

postRouter.post(
  "/like",
  passport.authenticate("jwt", { session: false }),
  likePost
);

export default postRouter;
