if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const flash = require('express-flash')
const session = require('express-session')
const usersRouter = require('./user/users-router')
const recipesRouter = require('./recipes/recipes-router')
const passport = require('passport')
const initializePassport = require('../passport-config')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(flash())
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
server.use(passport.initialize())
server.use(passport.session())

server.use('/api/users', usersRouter)
server.use('/api/recipes', recipesRouter)


module.exports = server
