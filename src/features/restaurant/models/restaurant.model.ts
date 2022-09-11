import { Model } from 'objection';
import { BaseModel } from '../../../database/base.model';
import { RestaurantPriceRange, RestaurantMealType } from '../restaurant.enum';

export class Restaurant extends BaseModel {
  static tableName = 'restaurant';

  id: number;
  name: string;
  priceRange?: RestaurantPriceRange;
  mealType?: RestaurantMealType;
  phoneNumber?: string;

  // relations
  addressId?: number;

  static get relationMappings() {
    const Address = require('./address.model');

    return {
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Address,
        join: {
          from: 'restaurant.addressId',
          to: 'address.id',
        },
      },
    };
  }
}
