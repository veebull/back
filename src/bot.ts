import TelegramBot from 'node-telegram-bot-api';
import { TOKEN, commands } from './lib/constants';
import handleBotStart from './botHandlers/handeBotStart';
import handleBotSubscribe from './botHandlers/handleBotSubscribe';
import handleBotUnsubscribe from './botHandlers/handleBotUnsubscribe';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === commands.start) await handleBotStart(chatId, bot);
  if (text === commands.subscribe) await handleBotSubscribe(msg.from!, bot, chatId);
  if (text === commands.unsubscribe) await handleBotUnsubscribe(msg.from!, bot, chatId);
});

bot.on('callback_query', async (query) => {
  const chatId = query.id;
  const text = query.data;

  if (text === commands.subscribe) await handleBotSubscribe(query.from!, bot, chatId, true);
  if (text === commands.unsubscribe) await handleBotUnsubscribe(query.from!, bot, chatId, true);
});

// Должно гарантировать корректное завершение работы
process.once('SIGINT', () => bot.stopPolling({ cancel: true })); //ctrl + c
process.once('SIGTERM', () => bot.stopPolling({ cancel: true })); //kill
