import { TAppQuery } from '../types';
import { errorAppLogger } from './loggers';

type TError = {
  message: string;
  err?: Error;
  status?: number;
};
type TErrorHandler = (error: TError, ...args: Parameters<TAppQuery>) => void;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: TErrorHandler = function (error, req, res, _) {
  const { message, err, status = 500 } = error;
  const { url, method, headers, params, query, body } = req;
  const erLog = `
    MESSAGE - ${message}
    ERR - ${JSON.stringify(err, null, 2)}
    URL - ${url}
    METHOD - ${method}
    PARAMS - ${JSON.stringify(params, null, 2)}
    BODY - ${JSON.stringify(body, null, 2)}
    HEADERS - ${JSON.stringify(headers, null, 2)}
    QUERY - ${JSON.stringify(query, null, 2)}
  `;
  errorAppLogger.error(erLog);
  res.status(status).send({ error: { message } });
  console.log(`Произошла ошибка: ${message}`);
};

export default errorHandler;
