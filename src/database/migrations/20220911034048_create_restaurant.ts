import {
  RestaurantMealType,
  RestaurantPriceRange,
} from './../../features/restaurant/restaurant.enum';
import { Knex } from 'knex';

const tableName = 'restaurant';

export async function up(knex: Knex) {
  await knex.schema.hasTable(tableName).then(async (exists) => {
    if (!exists) {
      await knex.schema.createTable(tableName, (t) => {
        t.increments();
        t.timestamps(true, true);
        t.string('name').notNullable();
        t.string('phoneNumber').nullable();
        t.string('cuisine').nullable();
        t.enum('priceRange', Object.values(RestaurantPriceRange)).nullable();
        t.enum('mealType', Object.values(RestaurantMealType)).nullable();
      });
    }
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable(tableName);
}
