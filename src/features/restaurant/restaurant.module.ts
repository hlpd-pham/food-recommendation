import { Address } from './models/address.model';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './models/restaurant.model';

@Module({
  imports: [ObjectionModule.forFeature([Restaurant, Address])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
