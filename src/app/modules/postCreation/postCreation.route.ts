import express, { NextFunction, Request, Response } from 'express'
import { postController } from './postCreation.controller';
import { upload } from '../../utils/sendImageToCloudinary';
const router=express.Router();

router.post('/create-post',
    upload.fields([{name:'itemImages'}]),
    (req:Request,res:Response,next:NextFunction)=>{
        req.body=JSON.parse(req.body.data);
        next();
    },
    postController.postCreationC )

export const postRoutes=router;