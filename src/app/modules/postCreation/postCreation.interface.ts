import { ObjectId } from "mongoose";

export interface IPost {
    title:string,
    content:string;
    userID:ObjectId;
    categoryID:ObjectId;
    images?:string[];
    premium:boolean;
    upvotes:number;
    downvotes:number;
    createdAt?: Date;
    updatedAt?: Date;
}