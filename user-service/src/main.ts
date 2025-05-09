import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './core/exceptions';
import { API_PREFIX } from './common/constants';
import { getRmqOptions } from './core/configs';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_PREFIX);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('User API')
    .setDescription(
      'The API documentation for the User System',
    )
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  app.connectMicroservice(getRmqOptions('user_queue'));
  await app.startAllMicroservices();

  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT, '0.0.0.0');

  const url = await app.getUrl();
  console.log(`🚀 Application is running on: ${url}`);
}
bootstrap();