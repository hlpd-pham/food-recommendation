import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
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
  @IsOptional()
  priceRange: RestaurantPrice;

  @IsEnum(RestaurantMealType)
  @IsOptional()
  mealType: RestaurantMealType;

  @IsObject({ always: true })
  @IsOptional()
  address: AddressDto;

  @IsArray()
  @IsOptional()
  operationTimes: OperationTimeDto[];
}

export class CreateRestaurantDto extends OmitType(RestaurantDto, [
  'id',
] as const) {}

export class UpdateRestaurantDto extends PartialType(RestaurantDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
