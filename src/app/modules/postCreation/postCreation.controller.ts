import { Request, Response } from "express";
import { postServices } from "./postCreation.service";
import { log } from "console";

const postCreationC=async(req:Request,res:Response)=>{
    try{
        const post=await postServices.createPosts(req.body,req.files);
        // send response with created user
       // console.log(post);
        
        res.status(200).json({
            success:true,
            message:'Data Posted successfully',
            data:post
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
const updatePostCreationC=async(req:Request,res:Response)=>{
    //console.log(req.body,req.files);
    
    try{
        const paramId=req.params.id;     
        const post=await postServices.updatePostCreationS(req.body,req.files,paramId);
        // send response with created user
       // console.log(post);
        
        res.status(200).json({
            success:true,
            message:'Data update successfully',
            data:post
        })
     }
     catch(error){
        res.status(500).json({
            success:false,
            message:'Data Updation failed',
            error:error.message
        })
     }
}

const getPostC=async(req:Request,res:Response)=>{
    try {
        const posts= await postServices.getPostS();
        res.status(200).json({
            success:true,
            message:'post found successfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'post not found',
            error:'An unknown error occurred'
        })
    }
}
const getPostIDC=async(req:Request,res:Response)=>{
    const postId=req.params.id;
    try {
        const posts= await postServices.getPostIDS(postId);
        res.status(200).json({
            success:true,
            message:'post found successfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'post not found',
            error:'An unknown error occurred'
        })
    }
}

const updatePostc=async(req:Request,res:Response)=>{
    const id=req.params.id; 
    console.log(id);
    try {
        const posts= await postServices.updateUpvotePostS(id);
        res.status(200).json({
            success:true,
            message:'post found successfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'post not found',
            error:'An unknown error occurred'
        })
    }
}

const updateDownPostc=async(req:Request,res:Response)=>{
    const id=req.params.id; 
   // console.log(id);
    try {
        const posts= await postServices.updateDownvotePostS(id);
        res.status(200).json({
            success:true,
            message:'Downvote Updated succcessfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'post not found',
            error:'An unknown error occurred'
        })
    }
}

const getCommentC=async(req:Request,res:Response)=>{
    try {
        const posts= await postServices.getCommentS();
        res.status(200).json({
            success:true,
            message:'comments found successfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'comments not found',
            error:'An unknown error occurred'
        })
    }
}
const addCommentsC=async(req:Request,res:Response)=>{
    const id=req.params.id; 
    const reqBody=req.body;
    //console.log(id,reqBody);
    try {
        const posts= await postServices.addCommentS(id,reqBody);
        res.status(200).json({
            success:true,
            message:'Comment Added succcessfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'Comments Not Added',
            error:'An unknown error occurred'
        })
    }
}
const deleteCommentsC=async(req:Request,res:Response)=>{
    const id=req.params.id; 
    const postID=req.body.postData;
    try {
        const posts= await postServices.deleteCommentS(id,postID);
        res.status(200).json({
            success:true,
            message:'Comment deleted succcessfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'Comments not deleted',
            error:'An unknown error occurred'
        })
    }
}
const deletePostC=async(req:Request,res:Response)=>{
    const id=req.params.id; 
    try {
        const posts= await postServices.deletePostS(id);
        res.status(200).json({
            success:true,
            message:'Post deleted succcessfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'Posts not deleted',
            error:'An unknown error occurred'
        })
    }
}
const updateCommentsC=async(req:Request,res:Response)=>{
    const id=req.params.id; 
    const reqBody=req.body;
    //console.log(id,reqBody);
    try {
        const posts= await postServices.updateCommentS(id,reqBody);
        res.status(200).json({
            success:true,
            message:'Comment Added succcessfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'Comments Not Added',
            error:'An unknown error occurred'
        })
    }
}

export const postController={
    postCreationC,
    getPostC,
    updatePostc,
    updateDownPostc,
    addCommentsC,
    getPostIDC,
    deleteCommentsC,
    updateCommentsC,
    getCommentC,
    deletePostC,
    updatePostCreationC
}