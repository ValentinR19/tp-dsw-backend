import { BudgetStatusTransition } from '@budgets-module/models/classes/budget-status-transition.entity';
import { Budget } from '@budgets-module/models/classes/budget.entity';
import { BudgetStatusHistoryService } from '@budgets-module/services/budget-status-history.service';
import { BudgetStatusTransitionService } from '@budgets-module/services/budget-status-transition.service';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { generateSaleNumber } from '@budgets-module/utils/generate-sale-code.function';
import { IUserPayload } from '@main-module/auth/models/interfaces/payload.interface';
import { Injectable } from '@nestjs/common';
import { FindOptions } from '@shared-module/types/find-options.type';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class BudgetChangeStatusService {
  constructor(
    private readonly budgetService: BudgetService,
    private readonly budgetStatusTransitionService: BudgetStatusTransitionService,
    private readonly budgetStatusHistoryService: BudgetStatusHistoryService,
    private readonly datasource: DataSource,
  ) {}

  async changeStatus(id: number, transitionName: string, user: IUserPayload): Promise<Budget> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const budget = await this.budgetService.findById(id, queryRunner);

      const statusTransition = await this.findStatusTransition({ fromStatusId: budget.statusId, transitionName }, queryRunner);

      const updatePayload: Partial<Budget> = {
        statusId: statusTransition.toStatusId,
        ...(transitionName === 'Confirmar' ? { saleNumber: generateSaleNumber(budget.id, budget.sellerId) } : {}),
      };

      const updatedBudget = await this.budgetService.update(id, updatePayload, queryRunner);
      await this.budgetStatusHistoryService.save({ budgetId: id, statusId: updatedBudget.statusId, userId: user.id }, queryRunner);

      await queryRunner.commitTransaction();
      return updatedBudget;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findStatusTransition(options: FindOptions<BudgetStatusTransition>, queryRunner?: QueryRunner): Promise<BudgetStatusTransition> {
    return this.budgetStatusTransitionService.findOneByOptions(options, queryRunner);
  }

  async revokeBudget(id: number, user?: IUserPayload): Promise<Budget> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.budgetService.findById(id, queryRunner);

      const updatedBudget = await this.budgetService.update(id, { statusId: 4 }, queryRunner);
      await this.budgetStatusHistoryService.save({ budgetId: id, statusId: updatedBudget.statusId, userId: user.id }, queryRunner);

      await queryRunner.commitTransaction();
      return updatedBudget;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
