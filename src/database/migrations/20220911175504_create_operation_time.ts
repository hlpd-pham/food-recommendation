import { Knex } from 'knex';

const operationTimeTable = 'operation_time';
const restaurantTable = 'restaurant';

export async function up(knex: Knex) {
  // create operation time table
  await knex.schema.hasTable(operationTimeTable).then(async (exists) => {
    if (!exists) {
      await knex.schema.createTable(operationTimeTable, (t) => {
        t.increments();
        t.timestamps(true, true);
        t.integer('day').notNullable();
        t.string('startTime').notNullable();
        t.string('endTime').notNullable();

        // foreign key to restaurant id
        t.integer('restaurantId')
          .unsigned()
          .references('id')
          .inTable(restaurantTable);
      });
    }
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists(operationTimeTable);
}
