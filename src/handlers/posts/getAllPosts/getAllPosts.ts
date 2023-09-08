import { Request, Response } from "express";
import Post from "../../../data/models/posts";
import { logger } from "../../../utils/logger";

async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await Post.find()
      .populate("createdBy")
      .sort({ createdAt: -1 })
      .populate("comments.commentBy")
      .exec();

    if (!posts) {
      res.status(200).json({ message: "No posts yet" });
    }

    res.status(200).json({ posts });
  } catch (error) {
    logger.error({ path: "/posts", error });
    res.status(500).json({ message: "internal server error" });
  }
}

export default getAllPosts;
