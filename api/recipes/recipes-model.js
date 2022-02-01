const db = require('../data/db-config.js');

function getAllRecipes() {
    return db('recipes')
}


module.exports = {
    getAllRecipes
}