import { Request, Response } from "express";
import Post from "../../../data/models/posts";
import logger from "../../../utils/logger";

const childLogger = logger.child({ module: "Create Post", version: "1" });

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

    childLogger.info({ postId: post._id }, "Created New Post");
    res.status(200).json({ message: "New Post Created", post });
  } catch (error) {
    childLogger.trace({ error }, "Failed to create new post");
    res.status(500).json({ message: "internal Server Error" });
  }
}

export default createPost;
