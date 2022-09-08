import { IsInt, IsMilitaryTime, IsString, Max, Min } from 'class-validator';

export class OperationTimeDto {
  @IsString()
  id: string;

  @IsString()
  restaurantId: string;

  @IsInt()
  @Min(0)
  @Max(6)
  day: number;

  @IsMilitaryTime()
  startTime: string;

  @IsMilitaryTime()
  endTime: string;
}
