import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/validRoles.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFilter } from './helpers/fileValidation';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('/addProduct')
  @Auth(ValidRoles.admin)
  @UseInterceptors(FileInterceptor('file', { fileFilter: FileFilter }))
  async createProduct(
    @Body() newProduct: any, //corregir esta parte!
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('El tipo de archivo no está permitido');
    }

    const product = await this.productService.createProduct(newProduct, file);

    return product;
  }

  @Post('/prueba')
  @UseInterceptors(FileInterceptor('file', { fileFilter: FileFilter }))
  pruebaUploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('El tipo de archivo no está permitido');
    }
    return file;
  }

  @Get()
  //@Auth(ValidRoles.admin)
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':category')
  //@Auth(ValidRoles.admin)
  async getProductsByCategory(
    @Param('category') category: string,
  ): Promise<Product[]> {
    return this.productService.getProductsCategory(category);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  async deleteProduct(@Param('id') id: number): Promise<void> {
    await this.productService.deleteProduct(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  async updateProduct(
    @Param('id') id: number,
    @Body() updatedProduct: Partial<Product>,
  ): Promise<Product> {
    return await this.productService.updateProduct(id, updatedProduct);
  }
}
