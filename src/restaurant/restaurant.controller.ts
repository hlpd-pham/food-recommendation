import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
} from './dtos/restaurant.dto';
import {
  RestaurantMealType,
  RestaurantPrice,
  RestaurantSortBy,
  RestaurantSortOrder,
} from './restaurant.enum';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get()
  getRestaurants(
    name?: string,
    cuisine?: string,
    priceRange?: RestaurantPrice,
    mealType?: RestaurantMealType,
    pageToken?: string,
    sortBy?: RestaurantSortBy,
    sortOrder?: RestaurantSortOrder,
  ) {
    return this.restaurantService.findAll(
      name,
      cuisine,
      priceRange,
      mealType,
      pageToken,
      sortBy,
      sortOrder,
    );
  }

  @Get(':id')
  getRestaurant(id: string) {
    return this.restaurantService.find(id);
  }

  @Put(':id')
  updateRestaurant(id: string, @Body() updateDto: UpdateRestaurantDto) {
    return this.restaurantService.update(id, updateDto);
  }

  @Post()
  createRestaurant(@Body() createDto: CreateRestaurantDto) {
    return this.restaurantService.create(createDto);
  }

  @Delete(':id')
  deleteRestaurant(@Param('id') id: string) {
    return this.restaurantService.delete(id);
  }
}
