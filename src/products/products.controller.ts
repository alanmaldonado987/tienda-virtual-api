import { Controller, Post, Body, Get, Delete, Param, Patch } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService){}

    @Post('/addProduct')
    createProduct(@Body() newProduct: CreateProductDto) {
        console.log(newProduct);
        return this.productService.createProduct(newProduct);
    }

    @Get()
    getProducts():Promise<Product[]>{
        return this.productService.getProducts();
    }

    @Get(':category')
    async getProductsByCategory(@Param('category') category: string): Promise<Product[]> {
      return this.productService.getProductsCategory(category);
    }

    @Delete(':id')
    async deleteProduct(@Param('id')id: number):Promise<void>{
      await this.productService.deleteProduct(id);
    }

    @Patch(':id')
    async updateProduct(@Param('id') id: number, @Body() updatedProduct: Partial<Product>,
    ): Promise<Product> {
      return await this.productService.updateProduct(id, updatedProduct);
    }
}
