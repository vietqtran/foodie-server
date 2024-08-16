import { Module } from '@nestjs/common'
import { RestaurantsService } from './restaurants.service'
import { RestaurantsController } from './restaurants.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Restaurant } from './entities/restaurant.entity'
import { RCategory } from '../r_categories/entities/r_category.entity'
import { Merchant } from '../merchants/entities/merchant.entity'
import { File } from '../file/entities/file.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmModule.forFeature([RCategory]),
    TypeOrmModule.forFeature([Merchant]),
    TypeOrmModule.forFeature([File]),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule { }
