import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router=express.Router();

router.post('/create-user', UserControllers.userRegister);
router.put('/user/:id',
    upload.single('profilePhoto'),
    (req:Request,res:Response,next:NextFunction)=>{
        req.body=JSON.parse(req.body.data);
        next();
    },
    UserControllers.updateUserC);
router.get('/user',UserControllers.getUserC)
router.put('/user/:id/follow',UserControllers.addFollowerC)
router.put('/user/:id/unfollow',UserControllers.deleteFollowerC)
router.put('/user/:id/favouritePost',UserControllers.addFavouritePostC)
router.patch('/user/status/:id',UserControllers.updateUserStatusc)
export const UserRoutes = router;