import { CustomerCategory } from './../models/classes/customer-category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CustomerCategoryRepository {
  constructor(@InjectRepository(CustomerCategory) private readonly repository: Repository<CustomerCategory>) {}
  async findAll(manager?: EntityManager): Promise<CustomerCategory[]> {
    const repo = manager ? manager.getRepository(CustomerCategory) : this.repository;
    return await repo.find();
  }
}
