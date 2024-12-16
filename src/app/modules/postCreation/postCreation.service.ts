import { sendImageToCloudanary } from "../../utils/sendImageToCloudinary";
import { IPost } from "./postCreation.interface";
import Post from "./postCreation.model";

const createPosts=async(payload:IPost,imageData:any)=>{
// const imageName=`${payload?.content?.split("").splice(0,0)}`;
// const path=imageData?.path;
// console.log(imageData);
imageData?.itemImages.map((data:any,indx:number)=>{
    //it creates a random name of image
    const imageName=`${Array.from({ length: 10 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]).join('')}`;
    const path=data?.path;
    sendImageToCloudanary(imageName,path)
})
//
//  const result=await Post.create(payload);
//  return result
}

export const postServices={
    createPosts
}