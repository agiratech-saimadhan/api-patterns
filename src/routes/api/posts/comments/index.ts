import { Router } from "express";

const commentsRouter = Router();

commentsRouter.get("/");
commentsRouter.get("/:id");
commentsRouter.post("/");
commentsRouter.patch("/:id");
commentsRouter.delete("/:id");

export default commentsRouter;
