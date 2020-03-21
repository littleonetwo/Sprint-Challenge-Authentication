const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const cookieParser = require("cookie-parser");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(cookieParser());

// server.use((err, req, res, next) =>{
//     console.log(err);
//     res.status(500).json({message:"Something went wrong"})
// })

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);


server.get('/', (req, res) =>{
  res.status(200).json({message:"Hi"});
})

module.exports = server;
