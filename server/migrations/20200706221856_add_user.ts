import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  if(!await knex.schema.hasTable('users')){
    return await knex.schema.createTable('users', function(table){
      table.increments();
      table.string('display_name');
      table.string('email');
      table.string('provider');
      table.string('password');
      table.string('token');
      table.timestamp('expire_token');
      table.timestamps(true, true);
    })
  }
}


export async function down(knex: Knex): Promise<any> {
}

