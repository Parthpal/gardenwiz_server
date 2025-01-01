import { log } from "console";
import { sendImageToCloudanary } from "../../utils/sendImageToCloudinary";
import { IPost } from "./postCreation.interface";
import Post from "./postCreation.model";
import mongoose, { ObjectId } from "mongoose";
import { date } from "zod";

const createPosts=async(payload:IPost,imageData:any)=>{
let itemImages:string[]=[];
await Promise.all(
    imageData?.itemImages.map(async(data:any)=>{
        //it creates a random name of image
        const imageName=`${Array.from({ length: 10 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]).join('')}`;
        const path=data?.path;
        const result = await sendImageToCloudanary(imageName, path);
        if (result) {
            const { secure_url } = result; // Extract secure_url from the response
           // console.log(secure_url, 'ssecureurl');
            itemImages?.push(secure_url); // Add the secure_url to the images array
           // console.log(payload);
           
        } else {
            console.log("Image upload failed, no result returned.");
        }
       
    })
)
payload.images = itemImages;
payload.premium= false;
payload.upvotes= 0;
payload.downvotes= 0;
payload.createdAt=new Date();
payload.updatedAt=new Date();
//console.log(payload);

const result=await Post.create(payload);
//console.log(result);
return result
}

const getPostS=()=>{
    const result=Post.find();
    return result;
}
const updateUpvotePostS=(id:string)=>{
    const result=Post.findByIdAndUpdate(
        {_id:id},
        {$inc:{upvotes:1}},
        { new: true })
        ;
    return result;
}
const updateDownvotePostS=async(id:string)=>{
    const result=Post.findByIdAndUpdate(
        {_id:id},
        {$inc:{downvotes:1}},
        { new: true })
        ;
    return result;
}
const addCommentS=async(id:string,payload:any)=>{
    const result=Post.findByIdAndUpdate(
        {_id:id},
        {comments:{ $addToSet: { userID: payload.userID,comment:payload.comment } }},
        { new: true })
        ;
    return result;
}
export const postServices={
    createPosts,
    getPostS,
    updateUpvotePostS,updateDownvotePostS,
    addCommentS
}