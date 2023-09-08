import express from "express";
import cors from "cors";
import path from "path";
import passport from "passport";

import { pino } from "./utils/logger";

import authRouter from "./routes/api/auth";
import userRouter from "./routes/api/users";
import jwtStrategy from "./config/passportConfig";

const app = express();

passport.use(jwtStrategy);

app.use(cors());
app.use(pino);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/:version/auth", authRouter);
app.use("/api/:version/users", userRouter);

export default app;
