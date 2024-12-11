import express from 'express';
import { AuthControllers } from './Auth.controller';

const router=express.Router();

router.post('/register',AuthControllers.registerUser)
router.post('/login',AuthControllers.loginUser)

export const authRoutes=router;