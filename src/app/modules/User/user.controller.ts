import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { User } from "./user.model";

const userRegister=async(req:Request,res:Response): Promise<void> =>{
 try{
    const user=await UserServices.createUser(req.body);
    // send response with created user
    res.status(200).json({
        success:true,
        message:'User created successfully',
        data:user
    })
 }
 catch(error){
    res.status(500).json({
        success:false,
        message:'User creation failed',
        error:error.message
    })
 }
}

const userLogin=async(req:Request,res:Response): Promise<void> =>{
    try{
       const user=await UserServices.createUser(req.body);
       // send response with created user
       res.status(200).json({
           success:true,
           message:'User Login successfully',
           data:user
       })
    }
    catch(error){
       res.status(500).json({
           success:false,
           message:'User failed',
           error:error.message
       })
    }
   }
const updateUserC=async(req:Request,res:Response): Promise<Response | void> =>{

    //console.log(req.body,req.params.id,req.files);
    try {
      //  Find and update the user
        const updatedUser= await UserServices.updateUserS(req.body,req.params.id,req.file)
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
          message: "User updated successfully",
          user: updatedUser,
        });
      } catch (error:any) {
        res.status(500).json({ message: "Error updating user", error: error.message });
       }
}
const modifyUserC=async(req:Request,res:Response)=>{
    //console.log(req.body,req.params.id,req.files);
    try {
      //  Find and update the user
        const updatedUser= await UserServices.modifyUserS(req.body,req.params.id)
        res.status(200).json({
          message: "User updated successfully",
        });
      } catch (error:any) {
        res.status(500).json({ message: "Error updating user", error: error.message });
       }
}

const getUserC=async(req:Request,res:Response)=>{
   // console.log(req.user); 
    try {
        const categories= await UserServices.getUserS();
        res.status(200).json({
            success:true,
            message:'User found successfully',
            data:categories
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'Users not found',
            error:'An unknown error occurred'
        })
    }
}

const getUserIDC=async(req:Request,res:Response)=>{
    const userId=req.params.id;
    //console.log(userId);
    try {
        const posts= await UserServices.getUserIDS(userId);
        res.status(200).json({
            success:true,
            message:'user found successfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'user not found',
            error:'An unknown error occurred'
        })
    }
}

const addFollowerC=async(req:Request,res:Response)=>{
    const followerId=req.params.id;
    const {currentUser}=req.body;
    const userdata={
        FollowerId:followerId,
        CurrentUserId:currentUser
    }
    try {
        const followers= await UserServices.addFollowerS(userdata);
        res.status(200).json({
            success:true,
            message:'Follower added successfully',
            data:followers
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'Follower not added',
            error:'An unknown error occurred'
        })
    }
}
const addFavouritePostC=async(req:Request,res:Response)=>{
    const userId=req.params.id;
    const {postID}=req.body;
    console.log(userId,postID);  
    try {
        const followers= await UserServices.addFavouritePostS(userId,postID);
        res.status(200).json({
            success:true,
            message:'Follower added successfully',
            data:followers
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'Follower not added',
            error:'An unknown error occurred'
        })
    }
}
const deleteFollowerC=async(req:Request,res:Response)=>{
    const followingId=req.params.id;
    const {currentUser}=req.body;
    const userdata={
        FollowingId:followingId,
        CurrentUserId:currentUser
    }
    try {
        const result= await UserServices.deleteFollowerS(userdata);
        res.status(200).json({
            success:true,
            message:'Follower Deleted successfully',
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'Follower Not Deleted',
            error:'An unknown error occurred'
        })
    }
}
const updateUserStatusc=async(req:Request,res:Response)=>{
    const id=req.params.id; 
   // const {status}=req.body;
    console.log(id);
    try {
        const posts= await UserServices.updateUserStatusS(id,req.body);
        res.status(200).json({
            success:true,
            message:'user status updated successfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'user status updated failed',
            error:'An unknown error occurred'
        })
    }
}
export const UserControllers = {
    userRegister,
    userLogin,
    updateUserC,
    getUserC,
    addFollowerC,
    deleteFollowerC,
    updateUserStatusc,
    addFavouritePostC,
    getUserIDC,
    modifyUserC
  };
