const db = require('../data/db-config');

async function getAllRecipes() {
//     select 
// r.recipe_name ,
// r.source ,
// r.serves , 
// r.prep_time ,
// r.cook_time,
// i.instruction_text as instructions ,
// i.step as step_number,
// ing.ingredient_name,
// ing.quantity
// from recipes as r 
// join instructions as i
// 	on i.recipe_id = r.recipe_id 
// join ingredients_instructions as instr
// 	on instr.instruction_id = i.instruction_id
// join ingredients as ing
// 	on ing.ingredient_id = instr.ingredient_id
// 	order by step_number

const rows = await db('recipes as r')
    .join('instructions as i', 'i.recipe_id ', 'r.recipe_id'  )
    .join('ingredients_instructions as instr', 'instr.instruction_id', 'i.instruction_id' )
    .join('ingredients as ing', 'ing.ingredient_id', 'instr.ingredient_id')
    .select(
        'r.recipe_name', 
        'r.source',
        'r.serves',
        'r.prep_time',
        'r.cook_time',
        'i.instruction_text as instructions',
        'i.step as step_number',
        'ing.ingredient_name',
        'ing.quantity'
    )
    .orderBy('step_number')

 return rows
}

function getById() {
    return

//     select 
// r.recipe_name ,
// r.source ,
// r.serves , 
// r.prep_time ,
// r.cook_time,
// i.instruction_text as instructions ,
// i.step as step_number,
// ing.ingredient_name,
// ing.quantity
// from recipes as r 
// join instructions as i
// 	on i.recipe_id = r.recipe_id 
// join ingredients_instructions as instr
// 	on instr.instruction_id = i.instruction_id
// join ingredients as ing
// 	on ing.ingredient_id = instr.ingredient_id
// 	where i.recipe_id = 1 
// 	order by step_number
	
}


function insert() {
    return
}

module.exports = {
    getAllRecipes,
    getById,
    insert
}