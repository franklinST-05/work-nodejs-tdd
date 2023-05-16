import express from 'express';
import { setupMiddlewares } from './middlewares';
import { setupRoutes } from './routes';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

setupMiddlewares(app);
setupRoutes(app);

export default app;
