import {
  RestaurantMealType,
  RestaurantPriceRange,
} from './../../features/restaurant/restaurant.enum';
import { Knex } from 'knex';

const tableName = 'restaurant';

export async function up(knex: Knex) {
  await knex.schema.hasTable(tableName).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(tableName, (t) => {
        t.increments();
        t.timestamps(true, true);
        t.string('name').notNullable();
        t.string('phoneNumber').nullable();
        t.enum('priceRange', Object.values(RestaurantPriceRange)).nullable();
        t.enum('mealType', Object.values(RestaurantMealType)).nullable();
      });
    }
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
