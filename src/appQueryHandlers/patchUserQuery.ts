import type { Request, Response } from 'express';
import User from 'src/models/User';
import createAppHandler from './createAppHandler';
import TelegramBot from 'node-telegram-bot-api';

export default function patchUserQuery(req: Request, res: Response) {
  createAppHandler({
    req,
    res,
    callback: async () => {
      const { id } = JSON.parse(req.query.user as string) as TelegramBot.User;
      const newTotalTaps = req?.body?.dataGame?.newTotalTaps;
      if (newTotalTaps) {
        await User.findOneAndUpdate({ tgUserId: id }, { $set: { 'dataGame.totalTaps': newTotalTaps } }, { new: true });

        res.send({ success: true });
      }

      res.send({ success: false });
    },
  });
}
