import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    //Permitir accesos
    origin: ['http://localhost:3000'], //Origen de peticion
    methods: ['GET', 'POST', 'DELETE', 'PATCH'], //Metodos que debe aceptar
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use('/uploads', express.static('uploads'));

  app.setGlobalPrefix('api/v1');

  await app.listen(4000);
}
bootstrap();
