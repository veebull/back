import { Router } from 'express';
import postMintQuery from '../appQueryHandlers/postMintQuery';

const mintRouter = Router();

mintRouter.post('/', postMintQuery);

module.exports = mintRouter;