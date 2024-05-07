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
      sendFunc(msgOnCommands.msgOnUnsubscribeNoRegister);
    } else if (!existingUser?.isSubscribed) {
      sendFunc(msgOnCommands.msgOnUnsubscribeRepeat);
    } else {
      await User.findOneAndUpdate({ tgUserId: id }, { isSubscribed: false })

      sendFunc(msgOnCommands.msgOnUnsubscribeSuccess);
    }
  } catch (err) {
    console.error(err)
    sendFunc(msgOnCommands.msgOnUnsubscribeError);
  }
}