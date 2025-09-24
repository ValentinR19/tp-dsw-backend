// src/modules/product/services/product-price.service.ts
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ProductCategoryRepository } from '@product-module/repositories/product-category.repository';
import { ProductCategory } from '@product-module/models/classes/product-category.entity';

@Injectable()
export class ProductCategoryService {
    constructor(
        private readonly categoryRepository: ProductCategoryRepository,
    ) { }
    async findAll(manager?: EntityManager): Promise<ProductCategory[]> {
        return await this.categoryRepository.findAll(manager);
    }

}