import { Request, Response } from "express";
import { paymentServices } from "./payment.service";

const paymentIntentCreationC=async(req:Request,res:Response)=>{
    try{
        const paymentIntent=await paymentServices.createPaymentIntentS(req.body);
        // send response with created user
        console.log(paymentIntent);
        
        res.status(200).json({
            success:true,
           // message:'client secret code created successfully',
            clientSecret:paymentIntent.client_secret
        })
     }
     catch(error){
        res.status(500).json({
            success:false,
           // message:'payment Data Posted failed',
            error:error.message
        })
     }
}

const paymentCreationC=async(req:Request,res:Response)=>{
    try{
        const post=await paymentServices.createPaymentS(req.body);
        // send response with created user
       // console.log(post);
        
        res.status(200).json({
            success:true,
            message:'payment Data Posted successfully',
            data:post
        })
     }
     catch(error){
        res.status(500).json({
            success:false,
            message:'payment Data Posted failed',
            error:error.message
        })
     }
}

const getPaymentC=async(req:Request,res:Response)=>{
    try {
        const posts= await paymentServices.getPaymentS();
        res.status(200).json({
            success:true,
            message:'payment data found successfully',
            data:posts
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'payment data not found',
            error:'An unknown error occurred'
        })
    }
}

export const paymentController={
    paymentCreationC,
    paymentIntentCreationC,
    getPaymentC
}