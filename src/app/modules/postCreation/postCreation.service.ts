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
//payload.premium= false;
payload.upvotes= 0;
payload.downvotes= 0;
payload.createdAt=new Date();
payload.updatedAt=new Date();
//console.log(payload);

const result=await Post.create(payload);
//console.log(result);
return result
}
const updatePostCreationS=async(payload:IPost,imageData:any,paramId:string)=>{
    // let itemImages:string[]=[];
    // await Promise.all(
    //     imageData?.itemImages.map(async(data:any)=>{
    //         //it creates a random name of image
    //         const imageName=`${Array.from({ length: 10 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]).join('')}`;
    //         const path=data?.path;
    //         const result = await sendImageToCloudanary(imageName, path);
    //         if (result) {
    //             const { secure_url } = result; // Extract secure_url from the response
    //            // console.log(secure_url, 'ssecureurl');
    //             itemImages?.push(secure_url); // Add the secure_url to the images array
    //            // console.log(payload);
               
    //         } else {
    //             console.log("Image upload failed, no result returned.");
    //         }
           
    //     })
    // )
   console.log(payload,paramId);
    
    const result=await Post.findByIdAndUpdate(
        {_id:paramId},
        { $set: 
            { 
                content: payload.contents,
                title:payload.title,
                categoryID:payload.categoryID,
                tags:payload.tags,
         } },
        { new: true }
    );
   // console.log(result);
    return result
    }

const getPostS=()=>{
    const result=Post.find();
    return result;
}
const getPostIDS=(id:string)=>{
    const result=Post.findById(id).populate({
        path: 'comments.userID',
        select: 'name profilePhoto', // Fetch specific fields
      })
      .exec();
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
const getCommentS=async()=>{
    const result=await Post.aggregate([
        {$project:{comments:1,_id:0}},
        {$unwind:"$comments"}
    ]);
    return result;
}
const addCommentS=async(id:string,payload:any)=>{
    console.log(id,payload); 
    const result=Post.findByIdAndUpdate(
        {_id:id},
        {
            $push:{
                comments:{
                    userID: payload.userID,comment:payload.comments
                }
            }
        },
        { new: true })
        ;
    return result;
}
const updateCommentS=async(id:string,payload:any)=>{
    
    const result=Post.updateOne(
        {_id:payload.postId,'comments._id':id},
        {
            $set:{
                'comments.$.comment':payload.comments
            }
        },
        { new: true })
        ;
    return result;
}
const deleteCommentS=async(id:string,postId:string)=>{
    //console.log(id,postId); 
    const result=Post.findByIdAndUpdate(
        {_id:postId},
        {
            $pull:{
                comments:{
                    _id:id
                }
            }
        },
        { new: true })
        ;
    return result;
}
const deletePostS=async(id:string)=>{
    //console.log(id,postId); 
    const result=Post.findByIdAndDelete(
        {_id:id},
        { new: true })
        ;
    return result;
}
export const postServices={
    createPosts,
    getPostS,
    getPostIDS,
    updateUpvotePostS,updateDownvotePostS,
    addCommentS,
    deleteCommentS,
    updateCommentS,
    getCommentS,
    deletePostS,
    updatePostCreationS
}