const router = require('express').Router()
const { checkRegisterPayload } = require('./auth-middleware')
const Users = require('../user/users-model')
const passport = require('passport')

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.status(200).json(req.user)
})

router.post('/register', checkRegisterPayload, (req, res, next) => {
    Users.insert(req.body)
        .then(user => {
          res.set('Access-Control-Allow-Origin', '*')
          return res.status(201).json(user)})
        .catch(err => next(err))
    
  })

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('https://secret-family-recipes-04.herokuapp.com/login')
})
module.exports = router