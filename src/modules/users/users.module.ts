import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { File } from '../file/entities/file.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([File]), UsersModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
