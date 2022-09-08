import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant/restaurant.controller';
import { RestaurantService } from './restaurant/restaurant.service';

@Module({
  imports: [],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class AppModule {}
