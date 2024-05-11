import User from '../models/User';
import createAppHandler from './createAppHandler';
import TelegramBot from 'node-telegram-bot-api';
import { BOT_APP_URL } from '../lib/constants';
import { TAppQuery } from 'src/lib/types';

const postUserQuery: TAppQuery = function (req, res, next) {
  createAppHandler({
    next,
    callback: async () => {
      const { id, first_name, username, is_bot, language_code, last_name } = JSON.parse(
        req.query.user as string,
      ) as TelegramBot.User;

      const userData = {
        tgUserId: id,
        firstName: first_name,
        lastName: last_name || '',
        username: username || '',
        is_bot: is_bot || null,
        languageCode: language_code || '',
        dataGame: {
          name: req?.body?.dataGame?.name,
          byReferral: req.query?.start_param || null,
          referalLink: `${BOT_APP_URL}?startapp=${id}`,
          totalTaps: 0,
          achievements: [],
          tasks: [],
          annexedByRef: [],
        },
      };

      const user = await User.findOneAndUpdate({ tgUserId: id }, userData, { upsert: true, new: true });

      res.send({ user });
    },
  });
};

export default postUserQuery;
