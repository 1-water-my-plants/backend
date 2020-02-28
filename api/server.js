const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// authRouter goes here

server.get('/', (req, res) => {
  res.send('welcome to Water My Plants API')
})

module.exports = server;