if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('./auth/auth-routing')
const usersRouter = require('./user/users-router')
const recipesRouter = require('./recipes/recipes-router')
const { checkAuth } = require('./auth/auth-middleware')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/users',checkAuth, usersRouter)
server.use('/api/recipes', checkAuth, recipesRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });

module.exports = server
