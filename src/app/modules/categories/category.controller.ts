import { Request, Response } from "express";
import { CategoryServices } from "./category.service";

const getCategoryC=async(req:Request,res:Response)=>{
    try {
        const categories= await CategoryServices.getCategoryS();
        res.status(200).json({
            success:true,
            message:'category found successfully',
            data:categories
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'category not found',
            error:'An unknown error occurred'
        })
    }
}

export const categoryController={
    getCategoryC
}