const router = require('express').Router()
const { checkRegisterPayload, checkLoginPayload } = require('./auth-middleware')
const Users = require('../user/users-model')

router.post('/login', checkLoginPayload, (req, res) => {
    res.status(200).json({token: req.token})
})

router.post('/register', checkRegisterPayload, (req, res, next) => {
    Users.insert(req.body)
        .then(user => {
          return res.status(201).json(user)})
        .catch(err => next(err))
    
  })

router.delete('/logout', (req, res) => {
    res.redirect('https://secret-family-recipes-04.herokuapp.com/login')
})
module.exports = router