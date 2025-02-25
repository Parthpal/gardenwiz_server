import mongoose, { Schema } from "mongoose";
import { IPost } from "./postCreation.interface";
import { tags } from "./postCreation.constant";

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    categoryID: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
    images: { type: [String], default: [] },
    comments:[{
      userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
      comment: { type: String, required: true },  // The comment text
      createdAt: { type: Date, default: Date.now } // Timestamp for the comment
      }],
    // premium: { type: Boolean, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tags:{
      type:String,
      enum:Object.keys(tags),
      default:tags.Beginners
    }
  });
  const Post = mongoose.model<IPost>('Post', postSchema);
  export default Post;