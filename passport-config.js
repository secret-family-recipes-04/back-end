const LocalStrategy = require('passport-local').Strategy
const Users = require('./users-model')
const bcrypt = require('bcrypt')

const initializePassport = (passport) => {
    const authenticateUser = (email, password, next) => {
        if(!email || !password){
            next({status: 401, message:"email and password required"})
        } else {
            Users.getBy('email', email)
                .then(user => {
                    if(user && bcrypt.compareSync(password, user.password)){
                        next()
                    } else {
                        next({status: 400, message: 'invalid credentials'})
                    }
                })
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}), authenticateUser)
    passport.serializeUser((user,next) => { })
    passport.deserializeUser((id,next) => { })
}

module.exports = initializePassport