import { Date, ObjectId } from "mongoose";

export interface IPost {
    title:string,
    content:string;
    userID:ObjectId;
    categoryID:ObjectId;
    images:string[];
    comments:IComment;
    premium:boolean;
    upvotes:number;
    downvotes:number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IComment{
    userID:ObjectId,
    comment:string,
    createdAt?: Date
} 