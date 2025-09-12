import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerShipping } from '../models/classes/customer-shipping.entity';
import { CustomerShippingRepository, ListQuery } from '../repositories/customer-shipping.repoository';
import { CreateCustomerShippingDto } from '../models/dto/create-customer-shipping.dto';
import { UpdateCustomerShippingDto } from '../models/dto/update-customer-shipping.dto';

@Injectable()
export class CustomerShippingService {
  constructor(private readonly repository: CustomerShippingRepository) { }

  async create(dto: CreateCustomerShippingDto) {
    const entity = this.repository.create({
      ...dto,
      number: String(dto.number),
      complement: dto.complement !== undefined ? String(dto.complement) : undefined,
      postalCode: String(dto.postalCode),
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
    if (!item) throw new NotFoundException(`CustomerShipping ${id} no encontrado`);
    return item;
  }

  async update(id: number, dto: UpdateCustomerShippingDto) {
    const current = await this.findOne(id);
    const next = Object.assign(current, {
      ...dto,
      number: dto.number !== undefined ? String(dto.number) : current.number,
      complement: dto.complement !== undefined ? String(dto.complement) : current.complement,
      postalCode: dto.postalCode !== undefined ? String(dto.postalCode) : current.postalCode,
    });
    return this.repository.save(next);
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
