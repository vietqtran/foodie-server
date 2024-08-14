import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/_app/app.module'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const logger = new Logger()
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('/api/v1')

    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalInterceptors(new TransformInterceptor())

    const config = new DocumentBuilder()
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
