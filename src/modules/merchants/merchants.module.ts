import { Module } from '@nestjs/common'
import { MerchantsService } from './merchants.service'
import { MerchantsController } from './merchants.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Restaurant } from '../restaurants/entities/restaurant.entity'
import { Merchant } from './entities/merchant.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant]), TypeOrmModule.forFeature([Merchant])],
    controllers: [MerchantsController],
    providers: [MerchantsService],
    exports: [MerchantsService],
})
export class MerchantsModule {}
