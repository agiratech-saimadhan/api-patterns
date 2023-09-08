import { Request, Response } from "express";
import Post from "../../../data/models/posts";

async function getPost(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json({ post });
    }
  } catch (error) {
    logger.error({ path: `api/posts/${id}`, error });
    res.status(500).json({ message: "Internal server error" });
  }
}

export default getPost;
