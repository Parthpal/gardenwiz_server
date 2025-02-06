/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cookieParser from 'cookie-parser';
import express, { Application, NextFunction, Request, Response } from 'express';
import config from './app/config';
import cors from 'cors'
import httpStatus from 'http-status'
import { UserRoutes } from './app/modules/User/user.route';
import { authRoutes } from './app/modules/Auth/Auth.route';
import { categoryRoutes } from './app/modules/categories/category.route';
import { postRoutes } from './app/modules/postCreation/postCreation.route';
import { paymentRoutes } from './app/modules/payment/payment.route';
import { MeilisearchRoutes } from './app/modules/Meilisearch/meilisearch.routes';

const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin: [config.client_url as string],
  })
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', UserRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/', categoryRoutes);
app.use('/api/v1/', postRoutes);
app.use('/api/v1/', paymentRoutes);
app.use('/api/v1/', MeilisearchRoutes);

//Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome to the GardenWiz API',
  });
});

//global error handler
//app.use(globalErrorHandler);

//handle not found
//app.use(notFound);

export default app;