import { Request, Response } from "express";
import { AuthServices } from "./Auth.service";
import config from "../../config";

const registerUser=async(req:Request,res:Response)=>{
    try{  
       const result=await AuthServices.registerUser(req.body);   
       const {refreshToken,accessToken}=result;

       res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'development',
        httpOnly: true,
        sameSite: true,
      });
      
       res.status(200).json({
           success:true,
           message:'User created successfully',
           data:{
            refreshToken,
            accessToken
           }
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

   const loginUser=async(req:Request,res:Response)=>{
    try{  
       const result=await AuthServices.loginUser(req.body);   
      const {refreshToken,accessToken}=result;

       res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'development',
        httpOnly: true,
      });
      
       res.status(200).json({
           success:true,
           message:'User Login successfully',
           data:{
            refreshToken,
            accessToken
           }
       })
     }
    catch(error){
       res.status(500).json({
           success:false,
           message:'User Login successfully',
           error:error.message
       })
    }
   }


   export const AuthControllers={
    registerUser,
    loginUser
   }