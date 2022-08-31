import express from 'express';
import { loggingRouter } from './loggingRouter';

export const rootRouter = express.Router();
rootRouter.use('/logger', loggingRouter);
