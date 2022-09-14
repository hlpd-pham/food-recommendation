import { getRange } from './../../../utils/array';
import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

const addressTable = 'address';
const restaurantTable = 'restaurant';
export async function seed(knex: Knex): Promise<any> {
  await knex.transaction(async (trx) => {
    // Delete all existing entries
    await knex(addressTable).del().transacting(trx);

    let data = [];

    getRange(5).map((n) => {
      const state = faker.address.stateAbbr();
      let entry = {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: state,
        zip: faker.address.zipCodeByState(state),
      };
      data.push(entry);
    });

    const addressIds = await knex(addressTable)
      .insert(data)
      .returning('id')
      .transacting(trx);
    const restaurantIds = await knex(restaurantTable)
      .select('id')
      .transacting(trx);

    let queries = [];

    for (let i = 0; i < restaurantIds.length; i++) {
      const aId = addressIds[i].id;
      const rId = restaurantIds[i].id;

      queries.push(
        knex(addressTable)
          .where('id', aId)
          .update({ restaurantId: rId })
          .transacting(trx),
      );
    }

    await Promise.all(queries);
  });
}
