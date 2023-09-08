import mongoose from "mongoose";
import { logger } from "../utils/logger";

async function connectToDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    logger.info(`Connected to Database: ${mongoose.connection.name}`);
  } catch (error) {
    logger.error("Database Connection Failed" + error);
    process.exit(1);
  }
}

export default connectToDB;
