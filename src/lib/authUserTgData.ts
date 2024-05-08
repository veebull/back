import type { Request } from "express";
import { TOKEN } from "./constants";
import { createHmac } from "crypto";

export default function authUserTgData(req: Request) {
  const initHash = req?.query?.hash;
  const initData = req.originalUrl.split('?')[1];
  const secretKey = createHmac('sha256', 'WebAppData').update(TOKEN);
  const hash = createHmac('sha256', secretKey.digest()).update(initData).digest('hex');
  return hash !== initHash
}