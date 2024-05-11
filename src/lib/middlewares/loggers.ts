import { join } from 'path';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
import 'winston-daily-rotate-file';
import winston, { Logger } from 'winston';
import expressWinston from 'express-winston';
import { Handler } from 'express';

const getLoggerOptions = (filename: string) => ({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: join(process.cwd(), 'logs', `${filename}-%DATE%.log`),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '7d',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
      ),
      rotationFormat: '.old',
    } as DailyRotateFileTransportOptions),
  ],
});

function createLogger(filename: string, isExpress: true): Handler;
function createLogger(filename: string): Logger;
function createLogger(filename: string, isExpress = false) {
  const logger = isExpress ? expressWinston.logger : winston.createLogger;
  return logger(getLoggerOptions(filename));
}

export const requestAppLogger = createLogger('requestApp.log', true);
export const errorAppLogger = createLogger('errorsApp.log');

export const requestBotLogger = createLogger('requestBot.log');
export const errorBotLogger = createLogger('errorsBot.log');
