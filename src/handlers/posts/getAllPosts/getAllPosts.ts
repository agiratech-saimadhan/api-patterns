import { Request, Response } from "express";
import Post from "../../../data/models/posts";
import logger from "../../../utils/logger";

const childLogger = logger.child({ module: "Get All Posts", version: "1" });

async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await Post.find()
      .populate("createdBy comments.commentBy")
      .sort({ createdAt: -1 })
      .exec();

    if (!posts) {
      childLogger.info({ posts }, "No Posts Found");
      res.status(200).json({ message: "No posts yet" });
    }

    childLogger.info({ posts }, "Retreived Posts");
    res.status(200).json({ posts });
  } catch (error) {
    childLogger.trace({ error }, "Failed to retreive data");
    res.status(500).json({ message: "internal server error" });
  }
}

export default getAllPosts;
