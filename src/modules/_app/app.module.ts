import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configValidationSchema } from '../../common/config/config.schema'
import { UsersModule } from '../users/users.module'
import { AuthModule } from '../auth/auth.module'
import { AppLoggerMiddleware } from 'src/common/middlewares/logging.middleware'
import { FileModule } from '../file/file.module'
import { PCategoriesModule } from '../p_categories/p_categories.module'
import { RCategoriesModule } from '../r_categories/r_categories.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env`],
            validationSchema: configValidationSchema,
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const isProduction = configService.get<string>('STAGE') === 'prod'
                return {
                    extra: {
                        ssl: isProduction ? { rejectUnauthorized: false } : null,
                    },
                    type: 'postgres',
                    autoLoadEntities: true,
                    synchronize: true,
                    host: configService.get<string>('DB_HOST'),
                    port: configService.get<number>('DB_PORT'),
                    username: configService.get<string>('DB_USERNAME'),
                    password: configService.get<string>('DB_PASSWORD'),
                    database: configService.get<string>('DB_DATABASE'),
                }
            },
        }),
        AuthModule,
        UsersModule,
        FileModule,
        PCategoriesModule,
        RCategoriesModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*')
    }
}
