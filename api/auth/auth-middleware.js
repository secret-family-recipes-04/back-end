const Users = require('../user/users-model')
const bcrypt = require('bcrypt')

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

const checkAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect('https://secret-family-recipes-04.herokuapp.com/login')
    }
}

const checkNotAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('https://secret-family-recipes-04.herokuapp.com/')
    } else {
        next()
    }
}
module.exports = {
    checkRegisterPayload,
    checkAuth
}