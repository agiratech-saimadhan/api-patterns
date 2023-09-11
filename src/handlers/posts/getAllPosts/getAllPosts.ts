import { Request, Response } from "express";
import Post from "../../../data/models/posts";
import logger from "../../../utils/logger";

const childLogger = logger.child({ module: "Get All Posts", version: "1" });

async function getAllPosts(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1; // Current page, default to 1
    const perPage = parseInt(req.query.perPage as string) || 5; // Items per page, default to 5

    const skip = (page - 1) * perPage;

    const postsQuery = Post.find()
      .populate("createdBy comments.commentBy")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    const totalPosts = await Post.countDocuments();

    const posts = await postsQuery.exec();

    if (!posts || posts.length === 0) {
      childLogger.info({ posts }, "No Posts Found");
      return res.status(200).json({ message: "No posts yet" });
    }

    const totalPages = Math.ceil(totalPosts / perPage);

    childLogger.info({ posts }, "Retrieved Posts");
    res.status(200).json({
      posts,
      page,
      perPage,
      totalPages,
      totalPosts,
    });
  } catch (error) {
    childLogger.trace({ error }, "Failed to retrieve data");
    res.status(500).json({ message: "Internal server error" });
  }
}

export default getAllPosts;
