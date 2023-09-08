import { Request, Response } from "express";
import Post from "../../../data/models/posts";
import { logger } from "../../../utils/logger";

async function createPost(req: Request, res: Response) {
  const { title, imageUri, tags } = req.body;

  const { id } = req.user;

  try {
    const newPost = new Post({
      title: title,
      imageUri: imageUri,
      tags: tags,
      createdBy: id,
    });

    const post = await newPost.save();

    logger.info({ action: "New Post Created", post });
    res.status(200).json({ message: "New Post Created", post });
  } catch (error) {
    logger.error({ action: "Create New Post", error });

    res.status(500).json({ message: "internal Server Error" });
  }
}

export default createPost;
