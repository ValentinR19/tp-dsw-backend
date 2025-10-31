import { BudgetStatusHistory } from '@budgets-module/models/classes/budget-status-history.entity';
import { BudgetStatusHistoryRepository } from '@budgets-module/repository/budget-status-history.repository';
import { Injectable, Logger } from '@nestjs/common';
import { NotSavedErrorException } from '@shared-module/exceptions/not-saved.exception';
import { DeepPartial, QueryRunner } from 'typeorm';

@Injectable()
export class BudgetStatusHistoryService {
  private logger: Logger = new Logger(BudgetStatusHistoryService.name);
  constructor(private readonly budgetStatusHistoryRepository: BudgetStatusHistoryRepository) {}

  async save(budgetStatusHistory: DeepPartial<BudgetStatusHistory>, queryRunner?: QueryRunner): Promise<BudgetStatusHistory> {
    try {
      this.logger.log(`Saving BudgetStatusHistory: ${JSON.stringify(budgetStatusHistory)} `);
      const savedBudgetStatusHistory = await this.budgetStatusHistoryRepository.save(budgetStatusHistory, queryRunner);
      this.logger.log(`Saved BudgetStatusHistory: ${JSON.stringify(savedBudgetStatusHistory)} `);
      return savedBudgetStatusHistory;
    } catch (error) {
      throw new NotSavedErrorException(BudgetStatusHistory.name, error);
    }
  }
}
