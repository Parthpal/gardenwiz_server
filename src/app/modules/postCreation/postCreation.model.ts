import mongoose, { Schema } from "mongoose";
import { IPost } from "./postCreation.interface";

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userID: { type: String, required: true },
    categoryID: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
    images: { type: [String], default: [] },
    premium: { type: Boolean, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Post = mongoose.model<IPost>('Post', postSchema);
  
  export default Post;