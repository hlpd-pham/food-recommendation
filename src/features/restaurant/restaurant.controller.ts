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
  getRestaurants() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  getRestaurant(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantService.find(id);
  }

  @Put()
  updateRestaurant(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateRestaurantDto,
  ) {
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
