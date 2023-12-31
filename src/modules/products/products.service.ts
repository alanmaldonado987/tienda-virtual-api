import { CreateProductDto } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async createProduct(product: CreateProductDto) {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductsCategory(category: string): Promise<Product[]> {
    return await this.productRepository.find({ where: { category: category } });
  }

  async getProductById(id: number) {
    return await this.productRepository.findOneBy({ id });
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async updateProduct(
    id: any,
    updatedFields: Partial<Product>,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      Object.assign(product, updatedFields);
      await this.productRepository.save(product);
      return product;
    } else {
      throw new Error('Product not found');
    }
  }
}
