import { Module } from '@nestjs/common'
import { RCategoriesService } from './r_categories.service'
import { RCategoriesController } from './r_categories.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RCategory } from './entities/r_category.entity'
import { Restaurant } from '../restaurants/entities/restaurant.entity'
import { File } from '../file/entities/file.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([RCategory]),
        TypeOrmModule.forFeature([Restaurant]),
        TypeOrmModule.forFeature([File]),
    ],
    controllers: [RCategoriesController],
    providers: [RCategoriesService],
})
export class RCategoriesModule { }
