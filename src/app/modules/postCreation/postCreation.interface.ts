import { ObjectId } from "mongoose";

interface IPost {
    content:string;
    tags:string[];
    authorID:ObjectId;
    categoryID:ObjectId;
    images?:string[];
    premium:boolean;
    upvotes:number;
    downvotes:number;
    createdAt?: Date;
    updatedAt?: Date;
}