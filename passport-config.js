const LocalStrategy = require('passport-local').Strategy
const Users = require('./api/user/users-model')
const bcrypt = require('bcrypt')

const initializePassport = (passport) => {
    const authenticateUser = (email, password, next) => {
        if(!email || !password){
            next(null, false, {status: 401, message:"email and password required"})
        } else {
            Users.getBy('email', email)
                .then(user => {
                    if(user && bcrypt.compareSync(password, user.password)){
                        next(null, user)
                    } else {
                        next(null, false, {status: 400, message: 'invalid credentials'})
                    }
                })
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user,next) => next(null, user.user_id))
    passport.deserializeUser((id,next) => next(null, Users.getBy('id', id).then(user=> user)))
}

module.exports = initializePassport