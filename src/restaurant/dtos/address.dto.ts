import { IsOptional, IsPostalCode, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  id: string;

  @IsString()
  restaurantId: string;

  @IsString()
  address1: string;

  @IsString()
  @IsOptional()
  address2?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsPostalCode()
  zipCode: string;
}
