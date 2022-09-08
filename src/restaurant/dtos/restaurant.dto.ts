import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import { RestaurantMealType, RestaurantPrice } from '../restaurant.enum';
import { AddressDto } from './address.dto';
import { OperationTimeDto } from './operation-time.dto';

export class RestaurantDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(RestaurantPrice)
  @IsNotEmpty()
  priceRange: RestaurantPrice;

  @IsEnum(RestaurantMealType)
  @IsNotEmpty()
  mealType: RestaurantMealType;

  @IsObject({ always: true })
  @IsNotEmpty()
  address: AddressDto;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(7)
  @ArrayMaxSize(7)
  operationTimes: OperationTimeDto[];
}

export class CreateRestaurantDto extends RestaurantDto {}

export class UpdateRestaurantDto extends PartialType(RestaurantDto) {
  @IsString()
  id: string;
}
