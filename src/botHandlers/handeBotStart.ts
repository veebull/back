import TelegramBot from "node-telegram-bot-api";
import fs from 'fs';
import { IMG_PATH, WEB_APP_URL, commands, feedbackUrl, msgOnCommands } from "src/lib/constants";



export default async function handleBotStart(chatId: number, bot: TelegramBot) {
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