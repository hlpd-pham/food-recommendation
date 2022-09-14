import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    return this.restaurantModel.query().withGraphFetched('address');
  }

  async findOne(id: number): Promise<Restaurant> {
    const res = await this.restaurantModel
      .query()
      .findById(id)
      .withGraphFetched('address');
    if (!res) {
      throw new NotFoundException(`Item with id ${id} not found.`);
    }
    return res;
  }

  async create(createDto: CreateRestaurantDto) {}

  async update(id: number, updateDto: UpdateRestaurantDto) {
    const restaurant = await this.findOne(id);
    const { address, ...restaurantPayload } = updateDto;
    if (address) {
      await restaurant.$relatedQuery('address').patch(address);
    }
    const updatedRestaurant = await restaurant
      .$query()
      .updateAndFetch(restaurantPayload)
      .withGraphFetched('address');
    return updatedRestaurant;
  }

  async delete(id: string) {}
}
