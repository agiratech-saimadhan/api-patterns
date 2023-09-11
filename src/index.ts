import express from "express";
import cors from "cors";
import path from "path";
import passport from "passport";
import jwtStrategy from "./config/passportConfig";
import { pinoHttp } from "pino-http";
import logger from "./utils/logger";

import authRouter from "./routes/api/auth";
import userRouter from "./routes/api/users";
import helloRouter from "./routes/api/hello";
import postRouter from "./routes/api/posts";
import rateLimitMiddleware from "./middlewares/rateLimitMiddleware";

const app = express();

passport.use(jwtStrategy);

app.use(cors());
app.use(pinoHttp({ logger }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(rateLimitMiddleware);

app.use("/api/:version/auth", authRouter);
app.use("/api/:version/users", userRouter);
app.use("/api/:version/hello", helloRouter);
app.use("/api/:version/posts", postRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Resource Not Found" });
});

export default app;
