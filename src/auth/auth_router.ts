import { Router } from 'express';
import * as auth from './controller';
import { loginMiddleware, registerMiddleware } from './middleware';

const authRouter = Router();

authRouter.post('/register', registerMiddleware, auth.register);
authRouter.post('/login', loginMiddleware, auth.login);
authRouter.post('/refresh-token', auth.refreshToken);

authRouter.delete('/logout', auth.logout);

export default authRouter;