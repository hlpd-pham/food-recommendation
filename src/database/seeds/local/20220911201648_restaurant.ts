import { getRange } from './../../../utils/array';
import {
  RestaurantPriceRange,
  RestaurantMealType,
} from './../../../features/restaurant/restaurant.enum';
import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

const tableName = 'restaurant';
export async function seed(knex: Knex): Promise<any> {
  // Delete all existing entries
  await knex(tableName).del();

  let data = [];
  const priceRanges = Object.values(RestaurantPriceRange);
  const mealTypes = Object.values(RestaurantMealType);

  getRange(5).forEach(() => {
    let entry = {
      name: faker.company.name(),
      phoneNumber: faker.phone.number(),
      priceRange: priceRanges[Math.floor(Math.random() * priceRanges.length)],
      mealType: mealTypes[Math.floor(Math.random() * mealTypes.length)],
    };
    data.push(entry);
  });

  await knex(tableName).insert(data);
}
