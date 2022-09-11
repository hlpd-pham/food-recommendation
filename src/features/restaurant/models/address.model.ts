import { BaseModel } from './../../../database/base.model';
export class Address extends BaseModel {
  tableName = 'address';

  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;

  static get relationMappings() {
    return {};
  }
}
