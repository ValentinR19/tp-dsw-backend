import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '@product-module/models/classes/product-category.entity';

import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductCategoryRepository {
  constructor(@InjectRepository(ProductCategory) private readonly repository: Repository<ProductCategory>) {}
  async findAll(manager?: EntityManager): Promise<ProductCategory[]> {
    const repo = manager ? manager.getRepository(ProductCategory) : this.repository;
    return await repo.find();
  }
}
