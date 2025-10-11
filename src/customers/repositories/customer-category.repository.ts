import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { Repository } from 'typeorm';
import { CustomerCategory } from '../models/classes/customer-category.entity';

@Injectable()
export class CustomerCategoryRepository {
  constructor(
    @InjectRepository(CustomerCategory)
    private readonly repo: Repository<CustomerCategory>,
  ) {}

  async findAll(): Promise<CustomerCategory[]> {
    return await this.repo.find();
  }

  async search(page: number, resultSize: number, filters?: Partial<CustomerCategory>, global?: string): Promise<IPaginated<CustomerCategory>> {
    const query = this.repo.createQueryBuilder('customerCategory');

    if (global) {
      query.andWhere('customerCategory.name LIKE :name', { name: `%${global}%` });
    }

    const [data, count] = await query
      .skip(resultSize * (page - 1))
      .take(resultSize)
      .getManyAndCount();

    return { data, count };
  }

  async create(payload: Partial<CustomerCategory>): Promise<CustomerCategory> {
    return this.repo.create(payload);
  }

  async save(entity: Partial<CustomerCategory>): Promise<CustomerCategory> {
    return await this.repo.save(entity);
  }

  async findById(id: number, includeDeleted = false): Promise<CustomerCategory | null> {
    return await this.repo.findOneOrFail({ where: { id }, withDeleted: includeDeleted });
  }

  async softDeleteById(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  async restoreById(id: number): Promise<void> {
    await this.repo.restore(id);
  }
}
