import { Request, Response } from "express";
import { postServices } from "./postCreation.service";

const postCreationC=async(req:Request,res:Response)=>{
    try{
        const user=await postServices.createPosts(req.body,req.files);
        // send response with created user
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