import TelegramBot from "node-telegram-bot-api";

export default async function handleBotCallbackQuery(query: TelegramBot.CallbackQuery, bot: TelegramBot) {
  const data = query.data;

  if (data === 'subscribe') {
    await bot.answerCallbackQuery(query.id, { text: 'Мы ещё в разработке... Но спасибо за интерес!' });
  }
}