import TelegramBot from "node-telegram-bot-api";
import fs from 'fs';
import User from "src/models/User";
import { IMG_PATH, WEB_APP_URL, commands, feedbackUrl, msgOnCommands } from "src/lib/constants";

export default async function handleBotMessage(msg: TelegramBot.Message, bot: TelegramBot) {
  const { id, first_name, username, is_bot, language_code, last_name } = msg.from!;
  const chatId = msg.chat.id;
  const text = msg.text;


  if (text === commands.start) {
    await bot.sendPhoto(chatId, fs.readFileSync(IMG_PATH), {
      caption: msgOnCommands.msgOnStart,
      reply_markup: {
        inline_keyboard: [
          [{ text: 'to the game', web_app: { url: WEB_APP_URL } }],
          [{ text: 'subscribe to updates', callback_data: commands.subscribe }],
          [{ text: 'unsubscribe', callback_data: commands.unsubscribe }],
          [{ text: "feedback", url: feedbackUrl }],
        ]
      }
    }, {
      contentType: 'image/jpeg',
      filename: 'cat.jpg'
    })
  }

  if (text === commands.subscribe) {
    try {
      const existingUser = await User.findOne({ tgUserId: id });

      if (existingUser?.isSubscribed) {
        await bot.sendMessage(`${chatId}`, msgOnCommands.msgOnSubscribeRepeat);
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

        await bot.sendMessage(`${chatId}`, msgOnCommands.msgOnSubscribeSuccess);
      }
    } catch (err) {
      console.log(err)
      bot.sendMessage(`${chatId}`, 'Что-то пошло не так');
    }
  }

  // if (text === commands.unsubscribe) {
  //   try {
  //     const
  //   }
  // }
}