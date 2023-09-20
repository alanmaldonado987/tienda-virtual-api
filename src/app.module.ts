import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm'; //Importacion de la libreria
import { Product } from './modules/products/entities/product.entity';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/auth/entities/auth.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    TypeOrmModule.forRoot({
      //Configurar BD
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'store-carvajal',
      entities: [Product, User],
      synchronize: true, // Clase reflejada en la base de datos
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
