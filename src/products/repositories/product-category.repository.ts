import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '@product-module/models/classes/product-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryRepository {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly repository: Repository<ProductCategory>,
  ) {}

  async findAll(): Promise<ProductCategory[]> {
    return this.repository.find();
  }
}
