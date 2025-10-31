import { Customer } from '@customers-module/models/classes/customer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { DeepPartial, EntityManager, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class CustomerRepository {
  constructor(@InjectRepository(Customer) private readonly repository: Repository<Customer>) {}

  async search(page: number, results: number, filters?: Partial<Customer>, global?: string): Promise<IPaginated<Customer>> {
    const queryBuilder = this.repository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.customerCategory', 'customerCategory')
      .leftJoinAndSelect('customer.status', 'status');

    if (global) {
      queryBuilder.andWhere(`(customer.firstName LIKE :global OR customer.lastName LIKE :global OR customer.document LIKE :global OR customer.internalCode LIKE :global)`, {
        global: `%${global}%`,
      });
    }

    const [data, count] = await queryBuilder
      .skip((page - 1) * results)
      .take(results)
      .getManyAndCount();

    return { data, count };
  }

  async findById(id: number): Promise<Customer> {
    return this.repository.findOneOrFail({
      where: { id },
      relations: {
        customerShipping: true,
        customerCategory: true,
      },
    });
  }

  async findAll(): Promise<Customer[]> {
    return this.repository.find();
  }

  async save(customer: DeepPartial<Customer>, queryRunner?: QueryRunner): Promise<Customer> {
    const repository = queryRunner ? queryRunner.manager.getRepository(Customer) : this.repository;
    return repository.save(customer);
  }

  async softDelete(id: number, manager?: EntityManager): Promise<void> {
    const repository = manager ? manager.getRepository(Customer) : this.repository;
    await repository.softDelete(id);
  }
}
