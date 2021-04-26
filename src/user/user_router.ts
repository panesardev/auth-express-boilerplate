import { Router } from 'express';
import { authenticate } from '../auth/middleware';
import * as user from './controller';

const userRouter = Router();

userRouter.get('/:email', authenticate, user.findByEmail);

export default userRouter;