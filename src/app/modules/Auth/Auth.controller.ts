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
    catch(error:any){
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
      //console.log(result);
      const {refreshToken,accessToken}=result;
      console.log(accessToken);
      
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
    catch(error:any){
       res.status(error.statusCode || 500).json({
           success:false,
           message: error.statusCode === 403 ? "Account is banned" : "User Login Failed",
           error:error.message
       })
    }
   }

   const changePasswordC=async(req:Request,res:Response)=>{
    try{   
        const { ...passwordData } = req.body;
       // console.log(req.user,passwordData); 
       const result=await AuthServices.changePasswordS(req.user,passwordData);  
      //console.log(result);
      res.status(200).json({
        success:true,
        message:'Password changed successfully',
    })
     }
    catch(error:any){
       res.status(error.statusCode || 500).json({
           success:false,
           message:'Password not changed',
           error:error.message
       })
    }
   }

  const refreshTokenC=async(req:Request,res:Response)=>{
    try{   
        const { refreshToken } = req.cookies;
        const result = await AuthServices.refreshTokenS(refreshToken);
        console.log(result);
      res.status(200).json({
        success:true,
        message:'Access token retrieved successfully!',
        })
     }
    catch(error:any){
       res.status(error.statusCode || 500).json({
           success:false,
           message:'Access token retrieved failed!',
           error:error.message
       })
    }
   }
   const forgetPasswordC=async(req:Request,res:Response)=>{
    try{   
        const { email } = req.body;
        //console.log(email);
        const result = await AuthServices.forgetPasswordS(email );
       // console.log(result);
        res.status(200).json({
        success:true,
        message:'Access token retrieved successfully!',
        })
     }
    catch(error:any){
       res.status(error.statusCode || 500).json({
           success:false,
           message:'Access token retrieved failed!',
           error:error.message
       })
    }
   }
   const resetPasswordC=async(req:Request,res:Response)=>{
    try{   
        const { email,newPassword } = req.body;
        const token=req.headers.authorization;
        console.log(email,newPassword,token);
        const result = await AuthServices.resetPasswordS(email,newPassword,token);
       // console.log(result);
        res.status(200).json({
        success:true,
        message:'Password Reset successfully!',
        })
     }
    catch(error:any){
       res.status(error.statusCode || 500).json({
           success:false,
           message:'Password Reset Failed',
           error:error.message
       })
    }
   }
   export const AuthControllers={
    registerUser,
    loginUser,
    changePasswordC,
    refreshTokenC,
    forgetPasswordC,
    resetPasswordC
   }