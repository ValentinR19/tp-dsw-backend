import { CustomerShipping } from '@customers-module/models/classes/customer-shipping.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class CustomerShippingRepository {
  constructor(
    @InjectRepository(CustomerShipping)
    private readonly repo: Repository<CustomerShipping>,
  ) {}

  save(entity: Partial<CustomerShipping>, queryRunner?: QueryRunner): Promise<CustomerShipping> {
    const repository = queryRunner ? queryRunner.manager.getRepository(CustomerShipping) : this.repo;
    return repository.save(entity, queryRunner);
  }
}
