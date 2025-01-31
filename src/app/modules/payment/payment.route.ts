import express, { NextFunction, Request, Response } from 'express';
import { paymentController } from './payment.controller';

const router=express.Router();

router.post('/payments',paymentController.paymentCreationC );
router.post('/create-payment-intent',paymentController.paymentIntentCreationC);

export const paymentRoutes = router;