import express from 'express'
import { categoryController } from './category.controller';

const router=express.Router();

router.get('/category',categoryController.getCategoryC);

export const categoryRoutes=router;