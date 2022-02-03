const db = require('../data/db-config')

function getAll() { return db('users') }

function getBy(key, value) { return db('users').where({[key]: value}).first() }

async function insert(user) {
    // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
    // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
    const [newUserObject] = await db('users').insert(user, ['user_id', 'email', 'password'])
    return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
  }

module.exports = {
    getAll,
    getBy,
    insert
}