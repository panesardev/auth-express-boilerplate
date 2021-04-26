import express from 'express';
import cors from 'cors';
import { logger } from './middlewares/logger';
import { initMongoDB } from './config/mongodb';
import authRouter from './auth/auth_router';
import userRouter from './user/user_router';
import { notFound } from './middlewares/404';

// Init
require('dotenv').config();
const server = express();
const port = process.env.PORT || 3000;
initMongoDB();

// Middlewares
server.use(express.json());
server.use(cors());
server.use(logger);

// Routes
server.use('/auth', authRouter);
server.use('/users', userRouter);

// 404 Error
server.use(notFound);

server.listen(port, () => {
	console.log(`Server running on PORT: ${port}`);
});
