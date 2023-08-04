// src/main.ts

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))

  // Enable validation pipe with detailed error messages
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
