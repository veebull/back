import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import handleBotMessage from './botHandlers/handleBotMessage';
import handleBotCallbackQuery from './botHandlers/handleBotCallbackQuery';

dotenv.config();

const TOKEN = process.env.TOKEN_BOT!;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (msg) => await handleBotMessage(msg, bot));
bot.on('callback_query', async (query) => await handleBotCallbackQuery(query, bot));