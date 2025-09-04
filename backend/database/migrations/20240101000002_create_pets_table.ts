import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('pets', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('species').notNullable();
    table.string('breed').notNullable();
    table.integer('age').notNullable();
    table.string('photo_url').notNullable();
    table.text('description').notNullable();
    table.enum('status', ['available', 'pending', 'adopted']).notNullable().defaultTo('available');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('pets');
}
