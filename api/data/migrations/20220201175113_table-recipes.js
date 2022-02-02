exports.up = function (knex) {
    return knex.schema
      .createTable('recipes', tbl => {
        tbl.increments('recipe_id');
        tbl.text('recipe_name', 128)
          .unique()
          .notNullable();
      })
      .createTable('ingredients', tbl => {
        tbl.increments('ingredient_id');
        tbl.text('ingredient_name', 128)
          .unique()
          .notNullable();
        tbl.decimal('quantity')
      })
      .createTable('instructions', tbl => {
          tbl.increments('instruction_id')
          tbl.text('instruction_text', 128).notNullable()
          tbl.float('step')
          tbl.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
      })
      .createTable('ingredients-instructions', tbl => {
        tbl.increments('ingredients-instruction_id')
        tbl.integer('ingredient_id')
          .unsigned()
          .notNullable()
          .references('ingredient_id')
          .inTable('ingredients')
          .onDelete('RESTRICT')
          .onUpdate('RESTRICT')
        tbl.integer('instruction_id')
          .unsigned()
          .notNullable()
          .references('instruction_id')
          .inTable('instructions')
          .onDelete('RESTRICT')
          .onUpdate('RESTRICT')


    })
    }


      exports.down = function (knex) {
        return knex.schema
          .dropTableIfExists('ingredients-instructions')
          .dropTableIfExists('instructions')
          .dropTableIfExists('ingredients')
          .dropTableIfExists('recipes');
      };
      