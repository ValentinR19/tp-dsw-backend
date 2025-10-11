import { BudgetItem } from '@budgets-module/models/classes/budget-item.entity';
import { BudgetItemRepository } from '@budgets-module/repository/budget-item.repository';
import { Injectable } from '@nestjs/common';
import { NotSavedErrorException } from '@shared-module/exceptions/not-saved.exception';
import { QueryRunner } from 'typeorm';

@Injectable()
export class BudgetItemService {
  constructor(private readonly repository: BudgetItemRepository) {}

  async save(items: Partial<BudgetItem>[], queryRunner?: QueryRunner): Promise<BudgetItem[]> {
    try {
      return this.repository.save(items, queryRunner);
    } catch (error) {
      throw new NotSavedErrorException(BudgetItem.name, error);
    }
  }
}
