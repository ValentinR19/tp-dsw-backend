import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPriceHistory } from '@product-module/models/classes/product-price-history.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductPriceHistoryRepository {
  constructor(
    @InjectRepository(ProductPriceHistory)
    private readonly repository: Repository<ProductPriceHistory>,
  ) {}

  async save(data: Partial<ProductPriceHistory>, manager?: EntityManager): Promise<ProductPriceHistory> {
    const repo = manager ? manager.getRepository(ProductPriceHistory) : this.repository;
    return await repo.save(repo.create(data));
  }

  async findByProductId(productId: number, manager?: EntityManager): Promise<ProductPriceHistory[]> {
    const repo = manager ? manager.getRepository(ProductPriceHistory) : this.repository;
    return await repo.find({ where: { productId }, order: { changedAt: 'DESC' } });
  }
}
