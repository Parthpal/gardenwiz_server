import { Date, ObjectId } from "mongoose";
import { tags } from "./postCreation.constant";

export interface IPost {
    title:string,
    content:string;
    userID:ObjectId;
    categoryID:ObjectId;
    images:string[];
    comments:IComment;
    // premium:boolean;
    upvotes:number;
    downvotes:number;
    createdAt?: Date;
    updatedAt?: Date;
    tags?:keyof typeof tags;
}
export interface IComment{
    userID:ObjectId,
    comment:string,
    createdAt?: Date
} 