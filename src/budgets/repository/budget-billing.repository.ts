import { BudgetBilling } from '@budgets-module/models/classes/budget-billing.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class BudgetBillingRepository {
  constructor(@InjectRepository(BudgetBilling) private readonly repository: Repository<BudgetBilling>) {}

  async save(billing: Partial<BudgetBilling>, queryRunner?: QueryRunner): Promise<BudgetBilling> {
    const repository = queryRunner ? queryRunner.manager.getRepository(BudgetBilling) : this.repository;
    return repository.save(billing);
  }
}
