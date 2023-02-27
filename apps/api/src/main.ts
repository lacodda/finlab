import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from './app/configs/swagger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const document = SwaggerModule.createDocument(app, getSwaggerConfig());
  SwaggerModule.setup('swagger', app, document);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT ?? 3333;
  await app.listen(port);
  Logger.log(
    `🚀 API is running on: http://localhost:${port}`
  );
}

void bootstrap();
