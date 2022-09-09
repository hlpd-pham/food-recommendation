import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPostalCode, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  restaurantId: string;

  @IsString()
  @ApiProperty()
  address1: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address2?: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  state: string;

  @IsPostalCode()
  @ApiProperty()
  zipCode: string;
}
