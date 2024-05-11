import type { Request, Response } from 'express';
import User from '../models/User';
import createAppHandler from './createAppHandler';

export default function getUserQuery(req: Request, res: Response) {
  return createAppHandler({
    req,
    res,
    callback: async () => {
      const id = JSON.parse(req.query.user as string).id;
      const user = await User.findOne({ tgUserId: id });
      res.send({ user });
    },
  });
}
