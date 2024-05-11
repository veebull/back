import TelegramBot from 'node-telegram-bot-api';
import { msgOnCommands } from '../lib/constants';
import User from '../models/User';
import createBotHandler from './createBotHandler';

export default async function handleBotUnsubscribe(
  data: TelegramBot.User,
  bot: TelegramBot,
  chatId: number | string,
  isCallback = false,
) {
  createBotHandler({
    chatId,
    erMsg: msgOnCommands.msgOnUnsubscribeError,
    callback: async () => {
      const { id } = data;
      const sendFunc = async (msg: string) => {
        if (isCallback) {
          return bot.answerCallbackQuery(`${chatId}`, { text: msg });
        } else {
          return bot.sendMessage(`${chatId}`, msg);
        }
      };

      const existingUser = await User.findOneAndUpdate(
        { tgUserId: id, isSubscribed: true },
        { isSubscribed: false },
        { new: false },
      );

      if (!existingUser) {
        sendFunc(msgOnCommands.msgOnUnsubscribeNoRegister);
      } else {
        sendFunc(
          existingUser.isSubscribed ? msgOnCommands.msgOnUnsubscribeSuccess : msgOnCommands.msgOnUnsubscribeRepeat,
        );
      }
    },
  });
}
