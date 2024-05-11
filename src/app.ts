import { MONGO_URL, PORT, corsOptions, mongooseOptions } from './lib/constants';
import helmet from 'helmet';
import { errorAppLogger, requestAppLogger } from './lib/loggers';

const routes = require('./routes/index');
const express = require('express') as typeof import('express');
const cors = require('cors');
const mongoose = require('mongoose') as typeof import('mongoose');

try {
  mongoose.connect(MONGO_URL, mongooseOptions);
  const app = express();

  app.use(requestAppLogger);
  app.use(cors(corsOptions));

  app.use(helmet());
  app.use(express.json());

  app.use(routes);

  app.use(errorAppLogger);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err: unknown) {
  const {
    name = 'noName',
    message = 'noMessage',
    stack = 'noStack',
  } = err as { name: string; message: string; stack: string };
  console.log(`Произошла ошибка: \n name - ${name} \n message - ${message} \n stack - ${stack}`);
}
