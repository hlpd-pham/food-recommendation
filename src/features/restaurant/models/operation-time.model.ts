import { Model } from 'objection';
import { BaseModel } from './../../../database/base.model';

export class OperationTime extends BaseModel {
  tableName = 'operation_time';

  id: number;
  day: number;
  startTime: string;
  endTime: string;

  // relations
  restaurantId: number;

  static get relationMappings() {
    const Restaurant = require('./restaurant.model');

    return {
      restaurant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Restaurant,
        join: {
          from: 'operation_time.restaurantId',
          to: 'restaurant.id',
        },
      },
    };
  }
}
