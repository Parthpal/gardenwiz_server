import { Request, Response } from "express";
import { postServices } from "./postCreation.service";
import { log } from "console";

const postCreationC=async(req:Request,res:Response)=>{
    try{
        const post=await postServices.createPosts(req.body,req.files);
        // send response with created user
        console.log(post);
        
        res.status(200).json({
            success:true,
            message:'Data Posted successfully',
            data:user
        })
     }
     catch(error){
        res.status(500).json({
            success:false,
            message:'Data Posted failed',
            error:error.message
        })
     }
}

export const postController={
    postCreationC
}