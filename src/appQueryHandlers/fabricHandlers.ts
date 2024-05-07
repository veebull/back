import type { Request, Response } from "express";
import authUserTgData from "src/lib/authUserTgData";

interface CustomError extends Error {
  code?: number;
}

export default async function fabricHandlers(req: Request, res: Response, callback: () => void) {
  try {
    const isValide = authUserTgData(req);
    if (!isValide) {
      res.send({ error: { message: 'хэш не совпадает, работа с данными невозможна' } });
    } else {
      await callback();
    }
  } catch (err) {
    res.statusCode = 500;
    if ((err as CustomError)?.code === 11000) {
      console.error('пользователь уже существует');
      res.send({ error: { message: 'пользователь уже существует' } });
    } else {
      console.error(err);
      res.send({ error: { message: 'ошибка при обработке запроса' } });
    }
  }
}
