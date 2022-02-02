exports.seed = function (knex) {
  return knex('recipes').insert([
    { recipe_name: 'Prize Pizza' },
    { recipe_name: 'Fruit Salad'},
    { recipe_name: 'Ice Cream '},
    { recipe_name: 'Veggie Juice'},
  ])
}
