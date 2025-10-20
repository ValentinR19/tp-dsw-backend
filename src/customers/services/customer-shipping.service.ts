import { CustomerShipping } from '@customers-module/models/classes/customer-shipping.entity';
import { CustomerShippingRepository } from '@customers-module/repositories/customer-shipping.repository';
import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

@Injectable()
export class CustomerShippingService {
  constructor(private readonly repository: CustomerShippingRepository) {}

  async save(entity: Partial<CustomerShipping>, queryRunner?: QueryRunner): Promise<CustomerShipping> {
    return this.repository.save(entity, queryRunner);
  }
}
