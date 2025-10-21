import { Injectable } from '@nestjs/common';
import { ProductCategory } from '@product-module/models/classes/product-category.entity';
import { ProductCategoryRepository } from '@product-module/repositories/product-category.repository';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly productCategoryRepository: ProductCategoryRepository) {}

  async findAll(): Promise<ProductCategory[]> {
    return await this.productCategoryRepository.findAll();
  }
}
