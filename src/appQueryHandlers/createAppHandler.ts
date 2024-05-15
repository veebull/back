import type { NextFunction } from 'express';

interface CustomError extends Error {
  code?: number;
}

interface ICreateAppHandler {
  next: NextFunction;
  callback: () => Promise<void>;
}

export default async function createAppHandler({ next, callback }: ICreateAppHandler) {
  try {
    await callback();
  } catch (err) {

    if ((err as CustomError)?.code === 11000) {
      next({ message: 'пользователь уже существует', err });
    } else {
      next({ message: err });
    }
  }
}
