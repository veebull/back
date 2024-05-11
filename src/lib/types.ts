import type { NextFunction, Request, Response } from 'express';

export type TAppQuery = (req: Request, res: Response, next: NextFunction) => void;
