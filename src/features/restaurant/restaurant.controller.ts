import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
} from './dtos/restaurant.dto';
import { Restaurant } from './models/restaurant.model';
import {
  RestaurantMealType,
  RestaurantPriceRange,
  RestaurantSortBy,
  RestaurantSortOrder,
} from './restaurant.enum';
import { RestaurantService } from './restaurant.service';

@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get()
  async getRestaurants(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  async getRestaurant(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Restaurant> {
    return this.restaurantService.findOne(id);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantService.update(id, updateDto);
  }

  @Post()
  async createRestaurant(@Body() createDto: CreateRestaurantDto) {
    return this.restaurantService.create(createDto);
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: string) {
    return this.restaurantService.delete(id);
  }
}
