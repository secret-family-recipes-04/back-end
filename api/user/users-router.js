const express = require('express')
const Users = require('./users-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Users.getAll()
        .then(users => res.status(200).json(users))
        .catch(err => next(err))
  })
  
router.post('/', (req, res, next) => {
  
    Users.insert(req.body)
        .then(user => {
          res.set('Access-Control-Allow-Origin', '*')
          return res.status(201).json(user)})
        .catch(err => next(err))
    
  })

module.exports = router