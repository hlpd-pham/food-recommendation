import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPostalCode, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  street: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  city: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  state: string;

  @IsPostalCode()
  @IsOptional()
  @ApiProperty()
  zip: string;
}

export class CreateAddressDto extends OmitType(AddressDto, ['id']) {}
