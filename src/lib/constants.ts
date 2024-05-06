import path from "path";

export const IMG_PATH = path.join(__dirname, '../assets', 'cat.jpg');
export const PORT = process.env.PORT || 5000;
export const MONGO_URL = process.env.MONGO_URL!;
export const TOKEN = process.env.TOKEN_BOT!;
export const WEB_APP_URL = process.env.WEB_APP_URL!;

export const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  family: 4,
};

export const feedbackUrl = 'https://t.me/Frich22';
export const commands = {
  subscribe: '/subscribe',
  unsubscribe: '/unsubscribe',
  start: '/start'
}

export const msgOnCommands = {
  msgOnSubscribeSuccess: 'Мы ещё в разработке... Но спасибо за интерес!',
  msgOnSubscribeRepeat: 'Не переживайте, вы уже подписаны.',
  msgOnStart: 'Welcome! How are you? Play?',
  msgOnUnsubscribe: 'Мы ещё в разработке... Но спасибо за интерес!',
}