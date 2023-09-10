import { Request, Response } from "express";
import Post from "../../../data/models/posts";
import logger from "../../../utils/logger";

const childLogger = logger.child({ module: "Get Post", version: "1" });

async function getPost(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      childLogger.info({ postId: post._id }, "Retreived Post");
      res.status(200).json({ post });
    }
  } catch (error) {
    childLogger.trace({ error }, "Failed to retreive data");
    res.status(500).json({ message: "Internal server error" });
  }
}

export default getPost;
