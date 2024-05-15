import { MONGO_URL, PORT, corsOptions, mongooseOptions } from './lib/constants';
import helmet from 'helmet';
import { errorAppLogger, requestAppLogger } from './lib/middlewares/loggers';
import errorHandler from './lib/middlewares/errorHandler';
import handleBigError from './lib/handleBigError';

const routes = require('./routes/index');
const express = require('express') as typeof import('express');
const cors = require('cors');
const mongoose = require('mongoose') as typeof import('mongoose');

try {
  mongoose.connect(MONGO_URL, mongooseOptions);
  const app = express();
  if(process.env.NODE_ENV !== 'production'){
    app.use(cors());
  } else {
    app.use(cors(corsOptions));
  }
  app.use(helmet());
  app.use(requestAppLogger);

  app.use(express.json());

  app.use(routes);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err: unknown) {
  handleBigError(err, errorAppLogger);
}
