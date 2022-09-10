import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { RestaurantMealType, RestaurantPriceRange } from '../restaurant.enum';
import { AddressDto } from './address.dto';
import { OperationTimeDto } from './operation-time.dto';

const enumValidationErrorMessage = (enumName, enumType: any): string => {
  return `${enumName} must be one of ${Object.keys(enumType)}`;
};

export class RestaurantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cuisine: string;

  @IsEnum(RestaurantPriceRange, {
    message: enumValidationErrorMessage(
      'RestaurantPrice',
      RestaurantPriceRange,
    ),
  })
  @IsOptional()
  @ApiProperty()
  priceRange: RestaurantPriceRange;

  @IsEnum(RestaurantMealType, {
    message: enumValidationErrorMessage(
      'RestaurantMealType',
      RestaurantMealType,
    ),
  })
  @IsOptional()
  @ApiProperty()
  mealType: RestaurantMealType;

  @IsObject({ always: true })
  @IsOptional()
  @ApiProperty({ type: AddressDto })
  address: AddressDto;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [OperationTimeDto] })
  operationTimes: OperationTimeDto[];
}

export class CreateRestaurantDto extends OmitType(RestaurantDto, [
  'id',
] as const) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  cuisine: string;

  @IsEnum(RestaurantPriceRange, {
    message: enumValidationErrorMessage(
      'RestaurantPrice',
      RestaurantPriceRange,
    ),
  })
  @IsOptional()
  @ApiProperty({ enum: RestaurantPriceRange })
  priceRange: RestaurantPriceRange;

  @IsEnum(RestaurantMealType, {
    message: enumValidationErrorMessage(
      'RestaurantMealType',
      RestaurantMealType,
    ),
  })
  @IsOptional()
  @ApiProperty({ enum: RestaurantMealType })
  mealType: RestaurantMealType;

  @IsObject({ always: true })
  @IsOptional()
  @ApiProperty({ type: AddressDto })
  address: AddressDto;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [OperationTimeDto] })
  operationTimes: OperationTimeDto[];
}

export class UpdateRestaurantDto extends PartialType(RestaurantDto) {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  cuisine: string;

  @IsEnum(RestaurantPriceRange, {
    message: enumValidationErrorMessage(
      'RestaurantPrice',
      RestaurantPriceRange,
    ),
  })
  @IsOptional()
  @ApiProperty({ enum: RestaurantPriceRange })
  priceRange: RestaurantPriceRange;

  @IsEnum(RestaurantMealType, {
    message: enumValidationErrorMessage(
      'RestaurantMealType',
      RestaurantMealType,
    ),
  })
  @IsOptional()
  @ApiProperty({ enum: RestaurantMealType })
  mealType: RestaurantMealType;

  @IsObject({ always: true })
  @IsOptional()
  @ApiProperty()
  address: AddressDto;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [OperationTimeDto] })
  operationTimes: OperationTimeDto[];
}
