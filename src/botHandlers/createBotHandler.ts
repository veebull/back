import { bot } from '../bot';
import { errorBotLogger } from '../lib/loggers';

interface CustomError extends Error {
  message: string;
}

interface ICreateBotHandler {
  chatId: number | string;
  erMsg: string;
  callback: () => Promise<void>;
}

export default async function createBotHandler({ chatId, erMsg, callback }: ICreateBotHandler) {
  try {
    await callback();
  } catch (err) {
    console.error('new Error: ' + (err as CustomError)?.message);
    bot.sendMessage(chatId, erMsg);
    errorBotLogger.error(`chatId: ${chatId}, erMsg: ${erMsg}, err: ${err}`);
  }
}
