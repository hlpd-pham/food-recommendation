import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsObject,
  IsString,
} from 'class-validator';
import { RestaurantMealType, RestaurantPrice } from '../restaurant.enum';
import { AddressDto } from './address.dto';
import { OperationTimeDto } from './operation-time.dto';

export class RestaurantDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEnum(RestaurantPrice)
  priceRange: RestaurantPrice;

  @IsEnum(RestaurantMealType)
  mealType: RestaurantMealType;

  @IsObject({ always: true })
  address: AddressDto;

  @IsArray()
  @ArrayMinSize(7)
  @ArrayMaxSize(7)
  operationTimes: OperationTimeDto[];
}

export class CreateRestaurantDto extends PartialType(RestaurantDto) {}

export class UpdateRestaurantDto extends PartialType(RestaurantDto) {}
