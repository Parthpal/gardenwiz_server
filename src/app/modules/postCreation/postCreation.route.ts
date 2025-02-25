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
router.put('/update-post/:id',
    upload.fields([{name:'itemImages'}]),
    (req:Request,res:Response,next:NextFunction)=>{
        if (req.body.data){
            try {
                req.body = JSON.parse(req.body.data);
            } catch (error) {
                console.error("JSON parsing error:", error);
                return next(new Error("Invalid JSON format in request body"));
            }
        }
        next();
    },
    postController.updatePostCreationC )
router.get('/posts',postController.getPostC)
router.get('/posts/:id',postController.getPostIDC)
router.patch('/posts/upvote/:id',postController.updatePostc)
router.patch('/posts/downvote/:id',postController.updateDownPostc)
router.put('/posts/comments/:id',postController.addCommentsC)
router.delete('/posts/comments/:id',postController.deleteCommentsC)
router.patch('/posts/comments/:id',postController.updateCommentsC)
router.get('/ALLComments',postController.getCommentC)
router.delete('/posts/:id',postController.deletePostC)
router.get('/searchPosts', postController.postSearchItemC);

export const postRoutes=router;