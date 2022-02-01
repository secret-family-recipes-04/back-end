const express = require('express');
const Recipes = require('../recipes/recipes-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json('get all recipes')
})
router.get('/:id', (req, res, next) => {
    res.json('get all recipe by id')
})
router.post('/', (req, res, next) => {
    res.json('post recipes')
})


module.exports = router