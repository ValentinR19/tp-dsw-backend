import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPrice } from '@product-module/models/classes/product-price.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductPriceRepository {
  constructor(@InjectRepository(ProductPrice) private readonly repository: Repository<ProductPrice>) {}

  async save(data: Partial<ProductPrice>, manager?: EntityManager): Promise<ProductPrice> {
    const repo = manager ? manager.getRepository(ProductPrice) : this.repository;
    return await repo.save(repo.create(data));
  }

  async findByProductId(productId: number, manager?: EntityManager): Promise<ProductPrice | null> {
    const repo = manager ? manager.getRepository(ProductPrice) : this.repository;
    return await repo.findOne({ where: { productId } });
  }
}
