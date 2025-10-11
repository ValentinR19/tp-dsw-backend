import { CustomerStatus } from '@customers-module/models/classes/customer-status.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerStatusRepository {
  constructor(
    @InjectRepository(CustomerStatus)
    private readonly repo: Repository<CustomerStatus>,
  ) {}

  async findAll(): Promise<CustomerStatus[]> {
    return this.repo.find();
  }
}
