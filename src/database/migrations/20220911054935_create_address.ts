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

  // add foreign key from restaurant to address table
  await knex.schema.hasTable(restaurantTable).then(async (tableExists) => {
    if (tableExists) {
      await knex.schema
        .hasColumn(restaurantTable, 'addressId')
        .then(async (colExists) => {
          if (!colExists) {
            await knex.schema.alterTable(restaurantTable, (t) => {
              t.integer('addressId')
                .unsigned()
                .references('id')
                .inTable(addressTable);
            });
          }
        });
    }
  });
}

export async function down(knex: Knex) {
  await knex.schema
    .hasColumn(restaurantTable, 'address_id')
    .then(async (colExists) => {
      if (colExists) {
        await knex.schema.table(restaurantTable, (t) => {
          t.dropForeign(['addressId']);
          t.dropColumn('addressId');
        });
      }
    });

  await knex.schema.dropTableIfExists(addressTable);
}
