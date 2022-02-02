exports.seed = function (knex) {
  return knex('ingredients').insert([
    { ingredient_name: 'Prize Pizza' , quantity: 2},
    { ingredient_name: 'Fruit Salad', quantity: 4.5},
    { ingredient_name: 'Ice Cream ', quantity: .3},
    { ingredient_name: 'Veggie Juice', quantity: 1.8},
  ])
}
