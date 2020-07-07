import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  if(!await knex.schema.hasTable('todos')){
    return await knex.schema.createTable('todos', function(table){
      table.bigIncrements();
      table.string('title');
      table.text('description');
      table.integer('created_by');
      table.integer('is_done').defaultTo(0)
      table.timestamps(true, true);
    })
  }
}


export async function down(knex: Knex): Promise<any> {
}