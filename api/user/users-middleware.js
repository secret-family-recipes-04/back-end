const Users = require('./users-model')
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

const checkUserExists = (req, res, next) => {
    const {email} = req.body
    if(!email){
        next({status: 401, message:"email required"})
    } else {
        Users.getBy('email', email)
            .then(user => {
                if(!user){
                    next({status: 400, message: 'No user with this email exists'})
                } else {
                    next()
                }
            })
    }
}
module.exports = {
    checkRegisterPayload,
    checkUserExists
}