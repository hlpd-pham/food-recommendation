import { Model } from 'objection';
import { BaseModel } from '../../database/base.model';

export class Restaurant extends BaseModel {
  static tableName = 'restaurant';

  id: number;
  name: string;
  priceRange: string;
  mealType: string;
  phoneNumber: string;
  // address
  // operation times
}
