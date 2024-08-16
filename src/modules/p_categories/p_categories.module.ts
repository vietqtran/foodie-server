import { Module } from '@nestjs/common'
import { PCategoriesService } from './p_categories.service'
import { PCategoriesController } from './p_categories.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PCategory } from './entities/p_category.entity'
import { File } from '../file/entities/file.entity'

@Module({
    imports: [TypeOrmModule.forFeature([PCategory]), TypeOrmModule.forFeature([File])],
    controllers: [PCategoriesController],
    providers: [PCategoriesService],
    exports: [PCategoriesService],
})
export class PCategoriesModule { }
