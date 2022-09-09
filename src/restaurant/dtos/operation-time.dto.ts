import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMilitaryTime, IsString, Max, Min } from 'class-validator';

export class OperationTimeDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  restaurantId: string;

  @IsInt()
  @Min(0)
  @Max(6)
  @ApiProperty()
  day: number;

  @IsMilitaryTime()
  @ApiProperty()
  startTime: string;

  @IsMilitaryTime()
  @ApiProperty()
  endTime: string;
}
