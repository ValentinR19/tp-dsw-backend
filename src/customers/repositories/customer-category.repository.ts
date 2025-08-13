import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Raw } from 'typeorm';
import { CustomerCategory } from '../models/classes/customer-category.entity';

export type ListQuery = {
  page?: number;
  limit?: number;
  search?: string;
  active?: boolean;
  includeDeleted?: boolean;
  orderBy?: 'id' | 'name' | 'createdAt' | 'updatedAt';
  order?: 'ASC' | 'DESC';
};

@Injectable()
export class CustomerCategoryRepository {
  constructor(
    @InjectRepository(CustomerCategory)
    private readonly repo: Repository<CustomerCategory>,
  ) {}

  // ---------- Helpers ----------
  normalizeName(name: string): string {
    return name.trim().replace(/\s+/g, ' ');
  }

  async existsByNameInsensitive(name: string, excludeId?: number, withDeleted = true): Promise<boolean> {
    const normalized = name.toLowerCase();
    return this.repo.exist({
      where: {
        name: Raw((alias) => `LOWER(${alias}) = :n`, { n: normalized }),
        ...(excludeId ? { id: Raw((alias) => `${alias} <> :id`, { id: excludeId }) } : {}),
      } as any,
      withDeleted,
    });
  }

  create(payload: Partial<CustomerCategory>): CustomerCategory {
    return this.repo.create(payload);
  }

  save(entity: CustomerCategory): Promise<CustomerCategory> {
    return this.repo.save(entity);
  }

  findById(id: number, includeDeleted = false): Promise<CustomerCategory | null> {
    return this.repo.findOne({ where: { id }, withDeleted: includeDeleted });
  }

  async softDeleteById(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  async restoreById(id: number): Promise<void> {
    await this.repo.restore(id);
  }

  async findPaginated(q: ListQuery): Promise<{ data: Partial<CustomerCategory>[]; total: number }> {
    const { page = 1, limit = 10, search, active, includeDeleted = false, orderBy = 'createdAt', order: direction = 'DESC' } = q;

    const where: FindOptionsWhere<CustomerCategory> = {};
    if (typeof active === 'boolean') where.active = active ? 'true' : 'false';

    if (search && search.trim()) {
      const s = `%${search.trim().toLowerCase()}%`;
      (where as any).name = Raw((alias) => `LOWER(${alias}) LIKE :s`, { s });
    }

    const [data, total] = await this.repo.findAndCount({
      where,
      withDeleted: includeDeleted,
      take: limit,
      skip: (page - 1) * limit,
      order: { [orderBy]: direction as 'ASC' | 'DESC' },
      select: ['id', 'name', 'active', 'createdAt', 'updatedAt'],
    });

    return { data, total };
  }

  mapDbError(err: any): never {
    if (err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
      const e: any = new Error('duplicate-key');
      e.code = 'duplicate-key';
      throw e;
    }
    throw err;
  }
}
