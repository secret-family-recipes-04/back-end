const express = require('express')
const Users = require('./users-model')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', ['http://localhost:3000/', 'https://secret-family-recipes-04.herokuapp.com/'])
    Users.getAll()
        .then(users => res.status(200).json(users))
        .catch(err => next(err))
  })

router.get('/:id', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', ['http://localhost:3000/', 'https://secret-family-recipes-04.herokuapp.com/'])
    Users.getBy('user_id', req.params.id)
      .then(user => res.status(200).json(user))
      .catch(err => next(err))
})



module.exports = router