import getUserQuery from '../appQueryHandlers/getUserQuery';
import { Router } from 'express';
import patchUserQuery from '../appQueryHandlers/patchUserQuery';
import postUserQuery from 'src/appQueryHandlers/postUserQuery';

const userRouter = Router();

userRouter.get('/', getUserQuery);
userRouter.patch('/', patchUserQuery);
userRouter.post('/', postUserQuery);

module.exports = userRouter;
