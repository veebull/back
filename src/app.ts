import { MONGO_URL, PORT, mongooseOptions } from './lib/constants';

const express = require('express') as typeof import('express');
const cors = require('cors');
const mongoose = require('mongoose') as typeof import('mongoose');

mongoose.connect(MONGO_URL, mongooseOptions);
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

