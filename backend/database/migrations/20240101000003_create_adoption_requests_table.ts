import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('adoption_requests', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('pet_id').unsigned().notNullable().references('id').inTable('pets').onDelete('CASCADE');
    table.enum('status', ['pending', 'approved', 'denied']).notNullable().defaultTo('pending');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('adoption_requests');
}
