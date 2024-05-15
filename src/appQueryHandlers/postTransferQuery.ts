import createAppHandler from './createAppHandler';
import { TAppQuery } from '../lib/types';
import {run} from "../blockchain/scripts/transferJetton"


const postTransferQuery: TAppQuery = function (req, res, next) {
  createAppHandler({
    next,
    callback: async () => {
        // Check if req.body exists and contains the expected properties
        // if (!req.body ||!req.body.tokens ||!req.body.address) {
        //     return res.status(400).send({ message: 'Invalid request body' });
        // }
        console.log(req?.body)
        const tokens: string = req?.body?.tokens;
        const address: string = req?.body?.address;

      // основная логика трансфера от админа
      const transferRes = await run(tokens, address)
      if(transferRes.success){
        // decrease points from base
      }
      res.send({ success: true });
    },
  });
};

export default postTransferQuery;
