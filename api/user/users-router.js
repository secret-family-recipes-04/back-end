const express = require('express')
const Users = require('./users-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Users.getAll()
        .then(users => res.status(200).json(users))
        .catch(err => next(err))
  })

router.get('/:id', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    Users.getBy('user_id', req.params.id)
      .then(user => res.status(200).json(user))
      .catch(err => next(err))
})



module.exports = router