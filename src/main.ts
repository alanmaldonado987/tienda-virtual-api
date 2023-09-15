import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({  //Permitir accesos
    origin: ['http://localhost:3000'], //Origen de peticion
    methods: ['GET', 'POST', 'DELETE', 'PATCH'], //Metodos que debe aceptar
  });
  await app.listen(4000);
}
bootstrap();
