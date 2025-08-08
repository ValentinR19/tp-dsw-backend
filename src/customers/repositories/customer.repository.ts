import { Customer } from '@customers-module/models/classes/customer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

@Injectable()
export class CustomerRepository {
  constructor(@InjectRepository(Customer) private readonly repository: Repository<Customer>) {}

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

  async softDelete(id: number, manager?: EntityManager): Promise<void> {
    const repository = manager ? manager.getRepository(Customer) : this.repository;
    await repository.softDelete(id);
  }
}
