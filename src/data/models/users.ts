import mongoose, { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  hash: string;
  salt: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    hash: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    query: {
      byEmail(email: string) {
        return this.where({ email });
      },
    },
  }
);

const User = model<IUser>("User", userSchema);

export default User;
