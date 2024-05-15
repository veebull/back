import { TOKEN } from '../constants';
import { createHmac } from 'crypto';
import { TAppQuery } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authUserTgData: TAppQuery = function (req, _, next) {
  const initData = new URLSearchParams(req.query as Record<string, string>);
  initData.sort();

  const hash = initData.get('hash');
  initData.delete('hash');

  const dataToCheck = [...initData.entries()].map(([key, value]) => key + '=' + value).join('\n');
  const secretKey = createHmac('sha256', 'WebAppData').update(TOKEN).digest();
  const _hash = createHmac('sha256', secretKey).update(dataToCheck).digest('hex');
  // console.log("isDev", process.env.NODE_ENV == 'production')
  if (process.env.NODE_ENV == 'production' && hash !== _hash) {
    next({ message: 'хэш не совпадает, работа с данными невозможна' });
  }

  next();
};

export default authUserTgData;
