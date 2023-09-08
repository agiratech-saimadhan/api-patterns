import express from "express";
import cors from "cors";
import path from "path";

import { pino } from "./utils/logger";
import authRouter from "./routes/api/auth";

const app = express();

app.use(cors());
app.use(pino);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/:version/auth", authRouter);

export default app;
