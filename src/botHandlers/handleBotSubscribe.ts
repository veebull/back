import TelegramBot from "node-telegram-bot-api";
import { msgOnCommands } from "src/lib/constants";
import User from "src/models/User";

export default async function handleBotSubscribe(
  data: TelegramBot.User,
  bot: TelegramBot,
  chatId: number | string,
  isCallback = false,
) {
  const { id, first_name, username, is_bot, language_code, last_name } = data;
  const sendFunc = async (msg: string) => {
    if (isCallback) {
      return bot.answerCallbackQuery(`${chatId}`, { text: msg });
    } else {
      return bot.sendMessage(`${chatId}`, msg);
    }
  };

  try {
    const existingUser = await User.findOne({ tgUserId: id });

    if (existingUser?.isSubscribed) {
      await sendFunc(msgOnCommands.msgOnSubscribeRepeat);
    } else if (!existingUser?.isSubscribed) {
      await User.findOneAndUpdate({ tgUserId: id }, { isSubscribed: true })
      await sendFunc(msgOnCommands.msgOnSubscribeSuccess);
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

      await sendFunc(msgOnCommands.msgOnSubscribeSuccess);
    }
  } catch (err) {
    console.error(err)
    await sendFunc(msgOnCommands.msgOnSubscribeError);
  }
}