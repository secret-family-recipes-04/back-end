const Users = require('../user/users-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const checkRegisterPayload = (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        next({status: 401, message:"email and password required"})
    } else {
        req.body.password = bcrypt.hashSync(password, 10)
        Users.getBy('email', email)
            .then(user => {
                if(user){
                    next({status: 400, message: 'This email is already registered'})
                } else {
                    next()
                }
            })
    }
}

const checkLoginPayload = (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        next({status: 401, message:"email and password required"})
    } else {
        Users.getBy('email', email)
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)){
                    
                    const accessToken = jwt.sign({name: user.email}, process.env.SESSION_SECRET)
                    req.token = accessToken
                    next()
                } else {
                    next({status: 400, message: 'Invalid credentials'})
                }
            })
    }
}


const checkAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) { next({status: 401, message:'Token required'})}

    jwt.verify(token, process.env.SESSION_SECRET, (err, user) => {
        if(err) {next({status: 403, message:'Token invalid'})}
        req.user = user
        next()
    })
}

module.exports = {
    checkRegisterPayload,
    checkAuth,
    checkLoginPayload
}