import { BudgetShipping } from '@budgets-module/models/classes/budget-shipping.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class BudgetShippingRepository {
  constructor(@InjectRepository(BudgetShipping) private readonly repository: Repository<BudgetShipping>) {}

  async save(shipping: Partial<BudgetShipping>, queryRunner?: QueryRunner): Promise<BudgetShipping> {
    const repository = queryRunner ? queryRunner.manager.getRepository(BudgetShipping) : this.repository;
    return repository.save(shipping);
  }

  async findByBudgetId(budgetId: number, queryRunner?: QueryRunner): Promise<BudgetShipping> {
    const repository = queryRunner ? queryRunner.manager.getRepository(BudgetShipping) : this.repository;
    return repository.findOne({ where: { budgetId } });
  }
}
