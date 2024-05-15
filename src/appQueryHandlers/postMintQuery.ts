import createAppHandler from './createAppHandler';
import { TAppQuery } from '../lib/types';
import {run} from "../blockchain/scripts/deployMintJetton"


const postMintQuery: TAppQuery = function (req, res, next) {
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
        const selfMint: boolean = req?.body?.selfMint;

      // основная логика минта от админа
      const mintRes = await run(tokens, address, selfMint)
      if(mintRes.success){
        // decrease points from base
      }

      res.send({ success: true });
    },
  });
};

export default postMintQuery;
