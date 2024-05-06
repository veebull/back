import TelegramBot from "node-telegram-bot-api";
import path from 'path';
import fs from 'fs';

const IMG_PATH = path.join(__dirname, '../assets', 'cat.jpg');

export default async function handleBotMessage(msg: TelegramBot.Message, bot: TelegramBot) {
  const chatId = msg.chat.id;
  const text = msg.text;
  const WEB_APP_URL = process.env.WEB_APP_URL!;


  if (text === '/start') {
    await bot.sendPhoto(chatId, fs.readFileSync(IMG_PATH), {
      caption: 'Welcome! How are you? Play?',
      reply_markup: {
        inline_keyboard: [
          [{ text: 'to the game', web_app: { url: WEB_APP_URL } }],
          [{ text: 'subscribe to updates', callback_data: 'subscribe' }],
          [{ text: "feedback", url: "https://t.me/Frich22" }],
        ]
      }
    }, {
      contentType: 'image/jpeg',
      filename: 'cat.jpg'
    })
  }
}