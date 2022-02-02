exports.seed = function (knex) {
  return knex('recipes').insert([
    { recipe_name: 'Prize Pizza' , source: 'Chef Rio'},
    { recipe_name: 'Fruit Salad', source: ''},
    { recipe_name: 'Ice Cream ', source: 'Google'},
    { recipe_name: 'Veggie Juice', source: 'Book'},
  ])
}
