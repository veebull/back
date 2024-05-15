import { Router } from 'express';
import postTransferQuery from '../appQueryHandlers/postTransferQuery';

const mintRouter = Router();

mintRouter.post('/', postTransferQuery);

module.exports = mintRouter;