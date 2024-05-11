import { TOKEN } from '../constants';
import { createHmac } from 'crypto';
import { TAppQuery } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authUserTgData: TAppQuery = function (req, _, next) {
  const initHash = req?.query?.hash;
  const initData = req.originalUrl.split('?')[1];
  const secretKey = createHmac('sha256', 'WebAppData').update(TOKEN);
  const hash = createHmac('sha256', secretKey.digest()).update(initData).digest('hex');

  if (hash !== initHash) {
    next({ message: 'хэш не совпадает, работа с данными невозможна' });
  }

  next();
};

export default authUserTgData;
