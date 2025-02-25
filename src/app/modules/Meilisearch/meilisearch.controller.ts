import { Request, Response } from "express";
import { MeilisearchServices } from "./meilisearch.services";

const getMeiliSearchPostC=async(req:Request,res:Response)=>{
    const { searchTerm, limit } = req.query;
    // console.log(searchTerm);
   //console.log(req.data);
    const numberLimit = Number(limit) || 10;
    try {
        const result = await MeilisearchServices.getAllPosts(
            numberLimit,
            searchTerm as string
          );
        res.status(200).json({
            success:true,
            message:'meilisearch post found successfully',
            data: result
        })
    } catch (error:unknown) {
        res.status(500).json({
            success:false,
            message:'meilisearch post not found',
            error:'An unknown error occurred'
        })
    }
}

export const MeilisearchController={
    getMeiliSearchPostC
}