const db = require('../data/db-config');

async function getAllRecipes() {

const rows = await db('recipes as r')
    .join('instructions as i', 'i.recipe_id ', 'r.recipe_id'  )
    .join('ingredients_instructions as instr', 'instr.instruction_id', 'i.instruction_id' )
    .join('ingredients as ing', 'ing.ingredient_id', 'instr.ingredient_id')
    .select(
        "r.recipe_id",
        'r.recipe_name', 
        'r.source',
        'r.serves',
        'r.prep_time',
        'r.cook_time',
        'instr.instruction_id',
        'i.instruction_text',
        'i.step_number',
        'ing.ingredient_id',
        'ing.ingredient_name',
        'ing.quantity'
    )
    .orderBy('step_number')

 const result = {
    recipe_id: rows[0].recipe_id, 
    recipe_name: rows[0].recipe_name,
    instructions: rows.reduce((acc, row) => {
        if(!row.ingredient_id) {
            return acc.concat({
                instruction_id: row.instruction_id,
                step_number: row.step_number,
                instruction_text: row.instruction_text
            })
        }
        if (row.ingredient_id && !acc.find(i => {i.ingredient_id === row.ingredient_id})) {
            return acc.concat({
                instruction_id: row.instruction_id,
                step_number: row.step_number,
                instruction_text: row.instruction_text,
                ingredients: [
                    {
                        ingredient_id: row.ingredient_id, 
                        ingredient_name: row.ingredient_name,
                        quantity: row.quantity
                    }
                ]
            })
        }
      const currentStep = acc.find(i => { i.instruction_id === row.instruction_id })
      currentStep.ingredients.push({
        ingredient_id: row.ingredient_id, 
        ingredient_name: row.ingredient_name,
        quantity: row.quantity
      })
        return acc
    }, [])
 }
 return result
}

async function getById(){
	
const rows = await db('recipes as r')
    .join('instructions as i', 'i.recipe_id ', 'r.recipe_id'  )
    .join('ingredients_instructions as instr', 'instr.instruction_id', 'i.instruction_id' )
    .join('ingredients as ing', 'ing.ingredient_id', 'instr.ingredient_id')
    .select(
        "r.recipe_id",
        'r.recipe_name', 
        'r.source',
        'r.serves',
        'r.prep_time',
        'r.cook_time',
        'instr.instruction_id',
        'i.instruction_text',
        'i.step_number',
        'ing.ingredient_id',
        'ing.ingredient_name',
        'ing.quantity'
    )
    .where('i.recipe_id', 1 )
    .orderBy('step_number')

 const result = {
    recipe_id: rows[0].recipe_id, 
    recipe_name: rows[0].recipe_name,
    instructions: rows.reduce((acc, row) => {
        if(!row.ingredient_id) {
            return acc.concat({
                instruction_id: row.instruction_id,
                step_number: row.step_number,
                instruction_text: row.instruction_text
            })
        }
        if (row.ingredient_id && !acc.find(i => {i.ingredient_id === row.ingredient_id})) {
            return acc.concat({
                instruction_id: row.instruction_id,
                step_number: row.step_number,
                instruction_text: row.instruction_text,
                ingredients: [
                    {
                        ingredient_id: row.ingredient_id, 
                        ingredient_name: row.ingredient_name,
                        quantity: row.quantity
                    }
                ]
            })
        }
      const currentStep = acc.find(i => { i.instruction_id === row.instruction_id })
      currentStep.ingredients.push({
        ingredient_id: row.ingredient_id, 
        ingredient_name: row.ingredient_name,
        quantity: row.quantity
      })
        return acc
    }, [])
 }
 return result




}


async function addRecipe(recipe) {
    let newRecipe_id 
    await db.transaction(async (trx) => {
        const addRecipe = {
            recipe_name: recipe.recipe_name,
            source: recipe.source,
            serves: recipe.serves,
            prep_time: recipe.prep_time,
            cook_time: recipe.cook_time
        }
        let recipe_id 
        try {
            [{recipe_id}] = await trx('recipes').insert(addRecipe, 'recipe_id')
            newRecipe_id = recipe_id

        } catch (err) {
            res.status(400).json(err)
        }

        recipe.instructions.forEach(async (instruction) => {
            let instruction_id
            try {
                const [find_instruction_id] = await trx('instructions').where('instruction_text', instruction)
            } catch (err) {
                res.status(400).json(err)

            }
    
         
    })
    
})}

module.exports = {
    getAllRecipes,
    getById,

}