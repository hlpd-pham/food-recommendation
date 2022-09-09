import { Module } from '@nestjs/common';
import { RestaurantModule } from './features/restaurant/restaurant.module';

@Module({
  imports: [RestaurantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
