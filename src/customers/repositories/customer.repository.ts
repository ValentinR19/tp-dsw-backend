import { Customer } from '@customers-module/models/classes/customer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

@Injectable()
export class CustomerRepository {
  constructor(@InjectRepository(Customer) private readonly repository: Repository<Customer>) {}

  async search(pageNumber: number, resultSize: number = 10, filters?: Partial<Customer>): Promise<IPaginated<Customer>> {
    const query = this.repository.createQueryBuilder('customer');
    const [data, count] = await query
      .skip(resultSize * (pageNumber - 1))
      .take(resultSize)
      .getManyAndCount();

    return { data, count };
  }

  async findAll(): Promise<Customer[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Customer> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async save(customer: DeepPartial<Customer>, manager?: EntityManager): Promise<Customer> {
    const repository = manager ? manager.getRepository(Customer) : this.repository;
    return repository.save(customer);
  }

  async delete(id: number, manager?: EntityManager): Promise<void> {
    const repository = manager ? manager.getRepository(Customer) : this.repository;
    await repository.softDelete(id);
  }
}
