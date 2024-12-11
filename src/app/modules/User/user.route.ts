import express from 'express';
import { UserControllers } from './user.controller';

const router=express.Router();
export const UserRoutes = router;

router.post('/create-user',UserControllers.userRegister)