import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantModule } from './features/restaurant/restaurant.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [RestaurantModule, ConfigModule.forRoot(), DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
