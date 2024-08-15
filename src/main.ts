import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { AppModule } from './modules/_app/app.module'
import JwtAuthGuard from './modules/auth/guard/jwt.guard'

async function bootstrap() {
    const logger = new Logger()
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('/api/v1')

    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalInterceptors(new TransformInterceptor())
    app.useGlobalInterceptors(new LoggingInterceptor())
    app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Foodie Server')
        .setDescription('The Foodie API documentation')
        .setVersion('1.0')
        .addTag('---------- FOODIE')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    app.enableCors()

    const port = process.env.PORT
    await app.listen(port)
    logger.log(`Application listening on port ${port}`)
}
bootstrap()
