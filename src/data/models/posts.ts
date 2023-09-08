import mongoose, { Schema, model, Document, ObjectId } from "mongoose";

interface User {
  _id: ObjectId;
}

interface Post extends Document {
  title: string;
  imageUri: string;
  tags: string[];
  createdBy: User["_id"];
  likes: {
    user: User["_id"];
  }[];
  comments: {
    comment: string;
    commentBy: User["_id"];
  }[];
}

const postSchema = new Schema<Post>(
  {
    title: { type: String, required: true },
    imageUri: { type: String, required: true, trim: true, lowercase: true },
    tags: { type: [String], trim: true, lowercase: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    comments: [
      {
        comment: String,
        commentBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],
  },
  {
    timestamps: true,
    query: {
      byAuthor(authorId: Schema.Types.ObjectId) {
        return this.where({ createdBy: authorId });
      },
    },
  }
);

const Post = model<Post>("Post", postSchema);

export default Post;
