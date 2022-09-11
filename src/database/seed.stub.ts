import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

// TODO: fill in table name
const tableName = '';
export async function seed(knex: Knex): Promise<any> {
  // Delete all existing entries
  await knex(tableName).del();
}
