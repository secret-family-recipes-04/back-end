const express = require('express')
const Users = require('./users-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Users.getAll()
        .then(users => res.status(200).json(users))
        .catch(err => next(err))
  })
  
router.post('/', (req, res) => {
    Users.insert(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => next(err))
    
  })

module.exports = router