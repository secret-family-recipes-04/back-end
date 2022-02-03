if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const authRouter = require('./auth/auth-routing')
const usersRouter = require('./user/users-router')
const recipesRouter = require('./recipes/recipes-router')
const passport = require('passport')
const initializePassport = require('../passport-config')
const { checkAuth } = require('./auth/auth-middleware')

const server = express()
initializePassport(passport)

const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
 }

server.use(express.json())
server.use(helmet())
server.use(cors(corsOptions))
server.use(flash())
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
server.use(passport.initialize())
server.use(passport.session())
server.use(methodOverride('_method'))

server.use('/api/auth', authRouter)
server.use('/api/users', checkAuth, usersRouter)
server.use('/api/recipes', checkAuth, recipesRouter)

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: `${err.message}`})
    next()
  })
module.exports = server
