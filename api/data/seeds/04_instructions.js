exports.seed = function (knex) {
  return knex('instructions').insert([
    { instruction_text: 'Slice cheese' , step: 1, recipe_id:1},
    { instruction_text: 'Chop fruit', step: 1, recipe_id:2},
    { instruction_text: 'pour milk on ice ', step: 1, recipe_id:3},
    { instruction_text: 'Wash off vegstables', step: 1, recipe_id:4},
  ])
}
