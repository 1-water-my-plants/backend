const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const authRouter = require('../auth/auth-router.js');
const plantsRouter = require('../plants/plants-router.js');
const authenticate = require('../auth/authenticate-middleware.js');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/:user_id/plants', authenticate, plantsRouter);

server.get('/', (req, res) => {
  res.send('welcome to Water My Plants API')
})

module.exports = server;