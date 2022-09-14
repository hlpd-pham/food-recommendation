import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantModule } from './features/restaurant/restaurant.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RestaurantModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
