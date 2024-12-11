import { Request, Response } from "express";
import { UserServices } from "./user.service";

const userRegister=async(req:Request,res:Response)=>{
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

const userLogin=async(req:Request,res:Response)=>{
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
           message:'User  failed',
           error:error.message
       })
    }
   }
export const UserControllers = {
    userRegister,
    userLogin
  };