import TelegramBot from "node-telegram-bot-api";
import { msgOnCommands } from "src/lib/constants";
import User from "src/models/User";

export default async function handleBotSubscribe(data: TelegramBot.CallbackQuery | TelegramBot.Message, bot: TelegramBot) {
  const { id, first_name, username, is_bot, language_code, last_name } = data.from!;

  try {
    const existingUser = await User.findOne({ tgUserId: id });

    if (existingUser) {
      await bot.answerCallbackQuery(`${id}`, { text: msgOnCommands.msgOnSubscribeRepeat });
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

      await bot.answerCallbackQuery(`${id}`, { text: msgOnCommands.msgOnSubscribeSuccess });
    }
  } catch (err) {
    console.log(err)
    bot.answerCallbackQuery(`${id}`, { text: 'Что-то пошло не так' });
  }
}