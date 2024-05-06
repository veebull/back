import TelegramBot from "node-telegram-bot-api";
import { commands, msgOnCommands } from "src/lib/constants";
import User from "src/models/User";

export default async function handleBotCallbackQuery(query: TelegramBot.CallbackQuery, bot: TelegramBot) {
  const chatId = query.id;
  const data = query.data;

  if (data === commands.subscribe) {
    try {
      const { id, first_name, username, is_bot, language_code, last_name } = query.from;
      const existingUser = await User.findOne({ tgUserId: id });

      if (existingUser?.isSubscribed) {
        await bot.answerCallbackQuery(chatId, { text: msgOnCommands.msgOnSubscribeRepeat });
      } else {
        await User.create({
          tgUserId: id,
          firstName: first_name,
          isSubscribed: true,
          lastName: last_name || '',
          username: username || '',
          is_bot: is_bot || null,
          languageCode: language_code || '',
        })

        await bot.answerCallbackQuery(chatId, { text: msgOnCommands.msgOnSubscribeSuccess });
      }
    } catch (err) {
      console.log(err)
      bot.answerCallbackQuery(chatId, { text: 'Что-то пошло не так' });
    }
  }
}