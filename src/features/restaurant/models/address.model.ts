import { Model } from 'objection';
import { BaseModel } from './../../../database/base.model';
export class Address extends BaseModel {
  tableName = 'address';

  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;

  static get relationMappings() {
    const Restaurant = require('./restaurant.model');

    return {
      restaurant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Restaurant,
        join: {
          from: 'address.id',
          to: 'restaurant.id',
        },
      },
    };
  }
}
