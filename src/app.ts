/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cookieParser from 'cookie-parser';
import express, { Application, NextFunction, Request, Response } from 'express';
import config from './app/config';
import cors from 'cors'
import httpStatus from 'http-status'

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

//app.use('/api/v1', routes);

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