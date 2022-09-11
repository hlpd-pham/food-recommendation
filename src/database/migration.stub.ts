import { Knex } from 'knex';

// TODO: fill in table name
const tableName = '';

export async function up(knex: Knex) {
  knex.schema.hasTable(tableName).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(tableName, (t) => {
        // TODO: fill in table schema
        t.increments();
        t.timestamps(true, true);
      });
    }
  });
}

export async function down(knex: Knex) {
  // TODO: fill in roll back steps
  return knex.schema.dropTableIfExists(tableName);
}
