import { BudgetItem } from '@budgets-module/models/classes/budget-item.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class BudgetItemRepository {
  constructor(@InjectRepository(BudgetItem) private readonly repository: Repository<BudgetItem>) {}

  async save(items: Partial<BudgetItem>[], queryRunner?: QueryRunner): Promise<BudgetItem[]> {
    const repository = queryRunner ? queryRunner.manager.getRepository(BudgetItem) : this.repository;
    return repository.save(items);
  }

  async deleteByBudgetId(budgetId: number, queryRunner?: QueryRunner): Promise<void> {
    const repository = queryRunner ? queryRunner.manager.getRepository(BudgetItem) : this.repository;
    await repository.delete({ budgetId });
  }
}
