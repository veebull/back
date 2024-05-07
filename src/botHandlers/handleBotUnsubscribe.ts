import TelegramBot from "node-telegram-bot-api";
import { msgOnCommands } from "src/lib/constants";
import User from "src/models/User";

export default async function handleBotUnsubscribe(
  data: TelegramBot.User,
  bot: TelegramBot,
  chatId: number | string,
  isCallback = false,
) {
  const { id } = data;
  const sendFunc = async (msg: string) => {
    if (isCallback) {
      return bot.answerCallbackQuery(`${chatId}`, { text: msg });
    } else {
      return bot.sendMessage(`${chatId}`, msg);
    }
  };

  try {
    const existingUser = await User.findOne({ tgUserId: id });

    if (!existingUser) {
      await sendFunc(msgOnCommands.msgOnUnsubscribeNoRegister);
    } else if (!existingUser?.isSubscribed) {
      await sendFunc(msgOnCommands.msgOnUnsubscribeRepeat);
    } else {
      await User.findOneAndUpdate({ tgUserId: id }, { isSubscribed: false })

      await sendFunc(msgOnCommands.msgOnUnsubscribeSuccess);
    }
  } catch (err) {
    console.error(err)
    await sendFunc(msgOnCommands.msgOnUnsubscribeError);
  }
}