import User from '../models/User';
import createAppHandler from './createAppHandler';
import TelegramBot from 'node-telegram-bot-api';
import { TAppQuery } from '../lib/types';

const patchUserQuery: TAppQuery = function (req, res, next) {
  createAppHandler({
    next,
    callback: async () => {
      const { id } = JSON.parse(req.query.user as string) as TelegramBot.User;
      const newTotalTaps = req?.body?.dataGame?.newTotalTaps;
      if (newTotalTaps) {
        await User.findOneAndUpdate({ tgUserId: id }, { $set: { 'dataGame.totalTaps': newTotalTaps } }, { new: true });

        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
    },
  });
};

export default patchUserQuery;
