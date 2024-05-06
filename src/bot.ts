import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import handleBotCallbackQuery from './botHandlers/handleBotCallbackQuery';
import { TOKEN, commands } from './lib/constants';
import handleBotStart from './botHandlers/handeBotStart';

dotenv.config();

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === commands.start) await handleBotStart(chatId, bot);
  // if (text === commands.subscribe) await
});

bot.on('callback_query', async (query) => await handleBotCallbackQuery(query, bot));

// Должно гарантировать корректное завершение работы
process.once('SIGINT', () => bot.stopPolling({ cancel: true })); //ctrl + c
process.once('SIGTERM', () => bot.stopPolling({ cancel: true })); //kill
