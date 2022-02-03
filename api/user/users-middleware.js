const Users = require('./users-model')

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