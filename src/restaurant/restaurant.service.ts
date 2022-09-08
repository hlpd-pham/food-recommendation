import { Injectable } from '@nestjs/common';
import {
  CreateRestaurantDto,
  RestaurantDto,
  UpdateRestaurantDto,
} from './dtos/restaurant.dto';
import {
  RestaurantMealType,
  RestaurantPrice,
  RestaurantSortBy,
  RestaurantSortOrder,
} from './restaurant.enum';

@Injectable()
export class RestaurantService {
  private mockRestaurants: RestaurantDto[] = [];

  constructor() {}

  findAll(
    name?: string,
    cuisine?: string,
    priceRange?: RestaurantPrice,
    mealType?: RestaurantMealType,
    pageToken?: string,
    sortBy?: RestaurantSortBy,
    sortOrder?: RestaurantSortOrder,
  ) {}

  find(id: string) {}

  create(createdDto: CreateRestaurantDto) {}

  update(id: string, updateDto: UpdateRestaurantDto) {}

  delete(id: string) {}
}
