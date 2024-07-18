const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const socket = require('./socket');

const app = express();
const server = http.createServer(app);

app.use(express.json());

mongoose.connect(config.mongoURI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

socket.init(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
