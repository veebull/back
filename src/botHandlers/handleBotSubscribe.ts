import TelegramBot from 'node-telegram-bot-api';
import { msgOnCommands } from '../lib/constants';
import User from '../models/User';
import createBotHandler from './createBotHandler';

export default async function handleBotSubscribe(
  data: TelegramBot.User,
  bot: TelegramBot,
  chatId: number | string,
  isCallback = false,
) {
  createBotHandler({
    chatId,
    erMsg: msgOnCommands.msgOnSubscribeError,
    callback: async () => {
      const { id, first_name, username, is_bot, language_code, last_name } = data;
      const sendFunc = async (msg: string) => {
        if (isCallback) {
          return bot.answerCallbackQuery(`${chatId}`, { text: msg });
        } else {
          return bot.sendMessage(`${chatId}`, msg);
        }
      };

      const existingUser = await User.findOneAndUpdate(
        { tgUserId: id },
        {
          tgUserId: id,
          firstName: first_name,
          isSubscribed: true,
          lastName: last_name || '',
          username: username || '',
          is_bot: is_bot || null,
          languageCode: language_code || '',
        },
        { upsert: true, new: false },
      );

      if (existingUser?.isSubscribed) {
        sendFunc(msgOnCommands.msgOnSubscribeRepeat);
      } else {
        sendFunc(msgOnCommands.msgOnSubscribeSuccess);
      }
    },
  });
}
