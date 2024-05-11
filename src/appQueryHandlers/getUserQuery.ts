import { TAppQuery } from '../lib/types';
import User from '../models/User';
import createAppHandler from './createAppHandler';

const getUserQuery: TAppQuery = function (req, res, next) {
  return createAppHandler({
    next,
    callback: async () => {
      const id = JSON.parse(req.query.user as string).id;
      const user = await User.findOne({ tgUserId: id });
      res.send({ user });
    },
  });
};

export default getUserQuery;
