import { Model } from 'objection';
import { BaseModel } from '../../../database/base.model';
import { RestaurantPriceRange, RestaurantMealType } from '../restaurant.enum';
import { Address } from './address.model';

export class Restaurant extends BaseModel {
  static tableName = 'restaurant';

  id: number;
  name: string;
  priceRange?: RestaurantPriceRange;
  mealType?: RestaurantMealType;
  phoneNumber?: string;

  // Relations
  address?: Address;

  static get relationMappings() {
    return {
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: 'restaurant.id',
          to: 'address.restaurantId',
        },
      },
    };
  }
}
