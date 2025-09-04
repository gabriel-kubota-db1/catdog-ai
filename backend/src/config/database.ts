import knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile.js';

export function setupDatabase() {
  const db = knex(knexConfig.development);
  Model.knex(db);
}
