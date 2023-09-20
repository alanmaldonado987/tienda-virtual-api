import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/validRoles.interface';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('/addProduct')
  @Auth(ValidRoles.admin)
  createProduct(@Body() newProduct: CreateProductDto) {
    console.log(newProduct);
    return this.productService.createProduct(newProduct);
  }

  @Get()
  @Auth(ValidRoles.admin)
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':category')
  @Auth(ValidRoles.admin)
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
