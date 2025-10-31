import { BudgetStatusHistory } from '@budgets-module/models/classes/budget-status-history.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class BudgetStatusHistoryRepository {
  constructor(@InjectRepository(BudgetStatusHistory) private readonly repository: Repository<BudgetStatusHistory>) {}

  async save(budgetStatusHistory: DeepPartial<BudgetStatusHistory>, queryRunner?: QueryRunner): Promise<BudgetStatusHistory> {
    const repository = queryRunner ? queryRunner.manager.getRepository(BudgetStatusHistory) : this.repository;
    return repository.save(budgetStatusHistory);
  }
}
