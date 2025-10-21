import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@product-module/models/classes/product.entity';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(@InjectRepository(Product) private readonly repository: Repository<Product>) {}

  async search(pageNumber: number, resultSize: number, filters?: Partial<Product>, global?: string): Promise<IPaginated<Product>> {
    const query = this.repository.createQueryBuilder('product');

    if (global) {
      query.andWhere('product.name LIKE :global OR product.description LIKE :global', { global: `%${global}%` });
    }

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined) return;

        if (typeof value === 'string') {
          query.andWhere(`product.${key} LIKE :${key}`, { [key]: `%${value}%` });
        } else {
          query.andWhere(`product.${key} = :${key}`, { [key]: value });
        }
      });
    }

    const [data, count] = await query
      .skip(resultSize * (pageNumber - 1))
      .take(resultSize)
      .getManyAndCount();

    return { data, count };
  }

  async save(product: Partial<Product>, manager?: EntityManager): Promise<Product> {
    const repository = manager ? manager.getRepository(Product) : this.repository;
    return await repository.save(product);
  }

  async findById(id: number, manager?: EntityManager): Promise<Product | null> {
    const repository = manager ? manager.getRepository(Product) : this.repository;
    return await repository.findOneOrFail({ where: { id } });
  }

  async delete(id: number, manager?: EntityManager): Promise<void> {
    const repository = manager ? manager.getRepository(Product) : this.repository;
    await repository.softDelete(id);
  }
}
