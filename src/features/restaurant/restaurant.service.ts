import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRestaurantDto,
  RestaurantDto,
  UpdateRestaurantDto,
} from './dtos/restaurant.dto';
import { Restaurant } from './models/restaurant.model';
import {
  RestaurantMealType,
  RestaurantPriceRange,
  RestaurantSortBy,
  RestaurantSortOrder,
} from './restaurant.enum';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(Restaurant) private readonly restaurantModel: typeof Restaurant,
  ) {}

  async findAll() {
    return this.restaurantModel.query();
  }

  async find(id: string) {}

  async create(createDto: CreateRestaurantDto) {}

  async update(id: string, updateDto: UpdateRestaurantDto) {}

  async delete(id: string) {}

  private findItemIdx(id: string) {}
}
