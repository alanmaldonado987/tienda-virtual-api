import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm'; //Importacion de la libreria
import { Product } from './products/product.entity';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ProductsModule,
    TypeOrmModule.forRoot({ //Configurar BD
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Dante2020.',
      database: 'store-carvajal',
      entities: [ Product ], 
      synchronize: true // Clase reflejada en la base de datos
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
