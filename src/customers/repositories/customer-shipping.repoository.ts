import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Raw } from 'typeorm';
import { CustomerShipping } from '../models/classes/customer-shipping.entity';

export type ListQuery = {
  page?: number;
  limit?: number;
  search?: string; // busca en alias / recipientFirstName / recipientLastName / recipientEmail (company)
  customerId?: number; // filtra por cliente
  includeDeleted?: boolean;
  orderBy?: 'id' | 'customerId' | 'alias' | 'recipientFirstName' | 'recipientLastName' | 'createdAt' | 'updatedAt';
  order?: 'ASC' | 'DESC';
};

@Injectable()
export class CustomerShippingRepository {
  constructor(
    @InjectRepository(CustomerShipping)
    private readonly repo: Repository<CustomerShipping>,
  ) {}

  // -------- Helpers --------
  normalizeText(s: string): string {
    return s.trim().replace(/\s+/g, ' ');
  }

  create(payload: Partial<CustomerShipping>): CustomerShipping {
    return this.repo.create(payload);
  }

  save(entity: CustomerShipping): Promise<CustomerShipping> {
    return this.repo.save(entity);
  }

  findById(id: number, includeDeleted = false): Promise<CustomerShipping | null> {
    return this.repo.findOne({ where: { id }, withDeleted: includeDeleted });
  }

  async softDeleteById(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  async restoreById(id: number): Promise<void> {
    await this.repo.restore(id);
  }

  async findPaginated(q: ListQuery): Promise<{ data: Partial<CustomerShipping>[]; total: number }> {
    const { page = 1, limit = 10, search, customerId, includeDeleted = false, orderBy = 'createdAt', order: direction = 'DESC' } = q;

    const where: FindOptionsWhere<CustomerShipping> = {};

    if (typeof customerId === 'number') {
      (where as any).customerId = customerId;
    }

    if (search && search.trim()) {
      const s = `%${search.trim().toLowerCase()}%`;
      // Buscamos en múltiples campos (MySQL-friendly)
      (where as any) = [
        { ...(customerId ? { customerId } : {}), alias: Raw((a) => `LOWER(${a}) LIKE :s`, { s }) },
        { ...(customerId ? { customerId } : {}), recipientFirstName: Raw((a) => `LOWER(${a}) LIKE :s`, { s }) },
        { ...(customerId ? { customerId } : {}), recipientLastName: Raw((a) => `LOWER(${a}) LIKE :s`, { s }) },
        { ...(customerId ? { customerId } : {}), recipientEmail: Raw((a) => `LOWER(${a}) LIKE :s`, { s }) }, // company
      ] as any;
    }

    const [data, total] = await this.repo.findAndCount({
      where,
      withDeleted: includeDeleted,
      take: limit,
      skip: (page - 1) * limit,
      order: { [orderBy]: direction as 'ASC' | 'DESC' },
      select: [
        'id',
        'customerId',
        'recipientFirstName',
        'recipientLastName',
        'recipientEmail',
        'phoneNumber',
        'phoneAreaCode',
        'alias',
        'adress',
        'number',
        'complement',
        'postalCode',
        'deliveryInstructions',
        'createdAt',
        'updatedAt',
      ],
    });

    return { data, total };
  }
}
