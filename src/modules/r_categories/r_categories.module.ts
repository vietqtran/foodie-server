import { Module } from '@nestjs/common'
import { RCategoriesService } from './r_categories.service'
import { RCategoriesController } from './r_categories.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RCategory } from './entities/r_category.entity'

@Module({
    imports: [TypeOrmModule.forFeature([RCategory]), TypeOrmModule.forFeature([File]), RCategoriesModule],
    controllers: [RCategoriesController],
    providers: [RCategoriesService],
})
export class RCategoriesModule {}
