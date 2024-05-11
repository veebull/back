import { Logger } from 'winston';

const handleBigError = (error: unknown, logger: Logger) => {
  const erMsg = 'bot error: ' + JSON.stringify(error);
  logger.error(erMsg);
  console.error(erMsg);
  process.exit(1);
};

export default handleBigError;
