import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CustomerCategory } from '../models/classes/customer-category.entity';
import { CustomerCategoryRepository, ListQuery } from '../repositories/customer-category.repository';
import { CreateCustomerCategoryDto } from '../models/dto/create-customer-category.dto';
import { UpdateCustomerCategoryDto } from '../models/dto/update-customer-category.dto';

@Injectable()
export class CustomerCategoryService {
  constructor(private readonly repository: CustomerCategoryRepository) { }

  // ---------- CRUD ----------
  async create(dto: CreateCustomerCategoryDto) {
    const normalizedName = this.repository.normalizeName(dto.name);

    const exists = await this.repository.existsByNameInsensitive(normalizedName);
    if (exists) throw new ConflictException(`Ya existe "${normalizedName}".`);

    const entity = this.repository.create({
      name: normalizedName,
      active: dto.active ?? true,
    });

    return this.repository.save(entity);
  }

  async findAll(q: ListQuery) {
    const { data, total } = await this.repository.findPaginated(q);
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOne(id: number, includeDeleted = false) {
    const item = await this.repository.findById(id, includeDeleted);
    if (!item) throw new NotFoundException(`CustomerCategory ${id} no encontrada`);
    return item;
  }

  async update(id: number, dto: UpdateCustomerCategoryDto) {
    const current = await this.findOne(id);

    const next: Partial<CustomerCategory> = { ...current };

    if (dto.name !== undefined) {
      const normalizedName = this.repository.normalizeName(dto.name);
      const exists = await this.repository.existsByNameInsensitive(normalizedName, id);
      if (exists) throw new ConflictException(`Ya existe "${normalizedName}".`);
      next.name = normalizedName;
    }

    if (dto.active !== undefined) {
      next.active = dto.active;
    }

    return this.repository.save(next as CustomerCategory);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repository.softDeleteById(id);
    return { id, deleted: true };
  }

  async restore(id: number) {
    await this.repository.restoreById(id);
    return this.findOne(id);
  }
}
