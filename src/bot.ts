import TelegramBot from 'node-telegram-bot-api';
import { TOKEN, commands } from './lib/constants';
import handleBotStart from './botHandlers/handeBotStart';
import handleBotSubscribe from './botHandlers/handleBotSubscribe';
import handleBotUnsubscribe from './botHandlers/handleBotUnsubscribe';
import { errorBotLogger, requestBotLogger } from './lib/middlewares/loggers';
import handleBigError from './lib/handleBigError';

export const bot = new TelegramBot(TOKEN, { polling: true });

try {
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    requestBotLogger.info(`chatId: ${chatId}, text: ${text}, msg: ${JSON.stringify(msg)}`);

    if (text === commands.start) await handleBotStart(chatId, bot);
    if (text === commands.subscribe) await handleBotSubscribe(msg.from!, bot, chatId);
    if (text === commands.unsubscribe) await handleBotUnsubscribe(msg.from!, bot, chatId);
    if (text === commands.help) await bot.sendMessage(`${chatId}`, 'Мы ещё в разработке =)');
  });

  bot.on('callback_query', async (query) => {
    const chatId = query.id;
    const text = query.data;

    requestBotLogger.info(`chatId: ${chatId}, text: ${text}, query: ${JSON.stringify(query)}`);

    if (text === commands.subscribe) await handleBotSubscribe(query.from!, bot, chatId, true);
    if (text === commands.unsubscribe) await handleBotUnsubscribe(query.from!, bot, chatId, true);
    if (text === commands.help) await bot.answerCallbackQuery(chatId, { text: 'Мы ещё в разработке =)' });
  });

  // Должно гарантировать корректное завершение работы
  process.once('SIGINT', () => bot.stopPolling({ cancel: true })); //ctrl + c
  process.once('SIGTERM', () => bot.stopPolling({ cancel: true })); //kill
} catch (err) {
  handleBigError(err, errorBotLogger);
}
