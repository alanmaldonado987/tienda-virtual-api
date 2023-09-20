import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; //Importacion de la libreria
import { User } from '../auth/entities/auth.entity';
import { Product } from '../products/entities/product.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      //Configurar BD
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.USERNAME_BD,
      password: process.env.PASSWORD_BD,
      database: process.env.DATABASE,
      entities: [Product, User],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
