import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URL = process.env.MONGO_URL!;
export const TOKEN = process.env.TOKEN_BOT!;
export const WEB_APP_URL = process.env.WEB_APP_URL!;
export const BOT_APP_URL = process.env.BOT_APP_URL!;

export const IMG_PATH = join(__dirname, '../assets', 'cat.jpg');

export const corsOptions = {
  origin: WEB_APP_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  family: 4,
};

export const feedbackUrl = 'https://t.me/Frich22';
export const commands = {
  subscribe: '/subscribe',
  unsubscribe: '/unsubscribe',
  start: '/start',
  help: '/help',
};

export const msgOnCommands = {
  msgOnStart: 'Welcome! How are you? Play?',
  msgOnStartError: 'Старт не удался',

  msgOnSubscribeSuccess: 'Успешная подписка!',
  msgOnSubscribeRepeat: 'Не переживайте, вы уже подписаны.',
  msgOnSubscribeError: 'Что-то пошло не так',

  msgOnUnsubscribeSuccess: 'Подписка отменена.',
  msgOnUnsubscribeRepeat: 'Не переживайте, вы уже отписались.',
  msgOnUnsubscribeNoRegister: 'Вы ещё не подписались',
  msgOnUnsubscribeError: 'Что-то пошло не так',
};
