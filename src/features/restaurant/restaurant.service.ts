import { Injectable } from '@nestjs/common';
import {
  CreateRestaurantDto,
  RestaurantDto,
  UpdateRestaurantDto,
} from './dtos/restaurant.dto';
import {
  RestaurantMealType,
  RestaurantPriceRange,
  RestaurantSortBy,
  RestaurantSortOrder,
} from './restaurant.enum';

@Injectable()
export class RestaurantService {
  constructor() {}

  async findAll(
    name?: string,
    cuisine?: string,
    priceRange?: RestaurantPriceRange,
    mealType?: RestaurantMealType,
    pageToken?: string,
    sortBy?: RestaurantSortBy,
    sortOrder?: RestaurantSortOrder,
  ) {}

  find(id: string) {}

  create(createDto: CreateRestaurantDto) {}

  update(id: string, updateDto: UpdateRestaurantDto) {}

  delete(id: string) {}

  private findItemIdx(id: string) {}
}
