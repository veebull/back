const express = require('express') as typeof import('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

