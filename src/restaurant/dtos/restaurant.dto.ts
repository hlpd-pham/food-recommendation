import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
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

const enumValidationErrorMessage = (enumName, enumType: any): string => {
  return `${enumName} must be one of ${Object.keys(enumType)}`;
};

export class RestaurantDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(RestaurantPrice, {
    message: enumValidationErrorMessage('RestaurantPrice', RestaurantPrice),
  })
  @IsOptional()
  priceRange: RestaurantPrice;

  @IsEnum(RestaurantMealType, {
    message: enumValidationErrorMessage(
      'RestaurantMealType',
      RestaurantMealType,
    ),
  })
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
