import express from "express";
import cors from "cors";
import path from "path";

import { pino } from "./utils/logger";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/pages"));

app.use(cors());
app.use(pino);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

export default app;
