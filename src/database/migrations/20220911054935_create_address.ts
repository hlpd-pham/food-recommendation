import { Knex } from 'knex';

const addressTable = 'address';
const restaurantTable = 'restaurant';

export async function up(knex: Knex) {
  await knex.schema.hasTable(addressTable).then(async (exists) => {
    if (!exists) {
      return knex.schema.createTable(addressTable, (t) => {
        t.increments();
        t.timestamps(true, true);
        t.string('street').notNullable();
        t.string('city').notNullable();
        t.string('state').notNullable();
        t.string('zip').notNullable();

        t.integer('restaurantId')
          .unsigned()
          .references('id')
          .inTable(restaurantTable);
      });
    }
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists(addressTable);
}
