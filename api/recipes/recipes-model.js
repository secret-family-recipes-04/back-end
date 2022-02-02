const db = require('../data/db-config.js');

function getAllRecipes() {
    return db('recipes')
}

function getById() {
    return
}


function insert() {
    return
}

module.exports = {
    getAllRecipes,
    getById,
    insert
}