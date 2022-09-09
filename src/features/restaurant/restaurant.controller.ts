import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
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

@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get()
  getRestaurants(
    @Query('name') name?: string,
    @Query('cuisine') cuisine?: string,
    @Query('priceRange')
    priceRange?: RestaurantPrice,
    @Query('mealType')
    mealType?: RestaurantMealType,
    @Query('pageToken')
    pageToken?: string,
    @Query('sortBy')
    sortBy?: RestaurantSortBy,
    @Query('sortOrder')
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
  getRestaurant(@Param('id') id: string) {
    return this.restaurantService.find(id);
  }

  @Put()
  updateRestaurant(@Body() updateDto: UpdateRestaurantDto) {
    return this.restaurantService.update(updateDto.id, updateDto);
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
