import { Address } from './models/address.model';
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
import { InternalServerErrorException } from '@nestjs/common/exceptions';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(Restaurant) private readonly restaurantModel: typeof Restaurant,
    @Inject(Address) private readonly addressModel: typeof Address,
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

  async update(
    id: number,
    updateDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    const { address, ...restaurantPayload } = updateDto;
    if (address) {
      if (restaurant.address) {
        await restaurant.$relatedQuery('address').patch(address);
      } else {
        const newAddress = await this.addressModel
          .query()
          .insert(address)
          .returning('id');
        await restaurant.$relatedQuery('address').relate(newAddress.id);
      }
    }
    const updatedRestaurant = await restaurant
      .$query()
      .updateAndFetch(restaurantPayload)
      .withGraphFetched('address');
    return updatedRestaurant;
  }

  async create(createDto: CreateRestaurantDto): Promise<Restaurant> {
    const { address, ...restaurantPayload } = createDto;

    try {
      return this.restaurantModel.transaction(async (trx) => {
        let newRestaurant = await this.restaurantModel
          .query(trx)
          .insert(restaurantPayload)
          .returning('id');

        if (address) {
          let newAddress = await this.addressModel
            .query(trx)
            .insert(address)
            .returning('id');

          await newRestaurant.$relatedQuery('address').relate(newAddress.id);
        }

        return newRestaurant.$query(trx);
      });
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        'There was an issue creating a restaurant. Please try again later.',
      );
    }
  }

  async delete(id: number) {
    const toBeDeleted = await this.findOne(id);
    await this.restaurantModel.relatedQuery('address').for(id).delete();
    await this.restaurantModel.query().deleteById(id);
    return toBeDeleted;
  }
}
