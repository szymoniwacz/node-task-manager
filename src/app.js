const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config');

const app = express();

app.use(express.json());

mongoose.connect(config.mongoURI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
