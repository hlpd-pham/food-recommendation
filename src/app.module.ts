import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantModule } from './features/restaurant/restaurant.module';

@Module({
  imports: [RestaurantModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
