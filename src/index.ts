import express from "express";
import cors from "cors";
import path from "path";
import passport from "passport";

import authRouter from "./routes/api/auth";
import userRouter from "./routes/api/users";
import jwtStrategy from "./config/passportConfig";
import { pinoHttp } from "pino-http";
import logger from "./utils/logger";

const app = express();

passport.use(jwtStrategy);

app.use(cors());
app.use(pinoHttp({ logger }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/:version/auth", authRouter);
app.use("/api/:version/users", userRouter);

export default app;
