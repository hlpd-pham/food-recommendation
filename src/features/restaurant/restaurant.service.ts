import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import {
  CreateRestaurantDto,
  RestaurantDto,
  UpdateRestaurantDto,
} from './dtos/restaurant.dto';
import { restaurantData } from './restaurant.data';
import {
  RestaurantMealType,
  RestaurantPrice,
  RestaurantSortBy,
  RestaurantSortOrder,
} from './restaurant.enum';

@Injectable()
export class RestaurantService {
  private data: RestaurantDto[];

  constructor() {
    this.data = restaurantData();
  }

  findAll(
    name?: string,
    cuisine?: string,
    priceRange?: RestaurantPrice,
    mealType?: RestaurantMealType,
    pageToken?: string,
    sortBy?: RestaurantSortBy,
    sortOrder?: RestaurantSortOrder,
  ) {
    let res = this.data.filter((x) => x.name === name);
    return this.data;
  }

  find(id: string) {
    let itemIdx = this.findItemIdx(id);
    return this.data[itemIdx];
  }

  create(createDto: CreateRestaurantDto) {
    let newRestaurant: RestaurantDto = {
      id: faker.datatype.number().toString(),
      ...createDto,
    };
    this.data.push(newRestaurant);
    return newRestaurant;
  }

  update(id: string, updateDto: UpdateRestaurantDto) {
    let itemIdx = this.findItemIdx(id);
    for (let key in updateDto) {
      let newValue = updateDto[key];
      this.data[itemIdx][key] = newValue;
    }
    return this.data[itemIdx];
  }

  delete(id: string) {
    let itemIdx = this.findItemIdx(id);
    let toBeDeleted = this.data[itemIdx];
    this.data.splice(itemIdx, 1);
    return toBeDeleted;
  }

  private findItemIdx(id: string) {
    let itemIdx = this.data.findIndex((x) => x.id === id);
    if (itemIdx > -1) {
      return itemIdx;
    }
    throw new NotFoundException(`Item with id ${id} not found.`);
  }
}
