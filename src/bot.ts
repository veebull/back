import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const TOKEN = process.env.TOKEN_BOT!;
const IMG_PATH = path.join(__dirname, 'assets', 'cat.jpg');

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (msg) => {
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
})

bot.on('callback_query', async (query) => {
  const data = query.data;

  if (data === 'subscribe') {
    await bot.answerCallbackQuery(query.id, { text: 'Мы ещё в разработке... Но спасибо за интерес!' });
  }
})