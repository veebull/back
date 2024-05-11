import User from '../models/User';
import createAppHandler from './createAppHandler';
import { TAppQuery } from 'src/lib/types';

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
