import { Knex } from 'knex';

// TODO: fill in table name
const tableName = '';

export async function up(knex: Knex) {
  await knex.schema.hasTable(tableName).then(async (exists) => {
    if (!exists) {
      await knex.schema.createTable(tableName, (t) => {
        // TODO: fill in table schema
        t.increments();
        t.timestamps(true, true);
      });
    }
  });
}

export async function down(knex: Knex) {
  // TODO: fill in roll back steps
  await knex.schema.dropTableIfExists(tableName);
}
