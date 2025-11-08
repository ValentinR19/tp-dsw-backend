import { BudgetStatusTransition } from '@budgets-module/models/classes/budget-status-transition.entity';
import { BudgetStatusTransitionRepository } from '@budgets-module/repository/budget-status-transition.repository';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { Injectable, Logger } from '@nestjs/common';
import { NotFoundErrorException } from '@shared-module/exceptions/not-found.exception';
import { FindOptions } from '@shared-module/types/find-options.type';
import { QueryRunner } from 'typeorm';

@Injectable()
export class BudgetStatusTransitionService {
  private logger = new Logger(BudgetStatusTransitionService.name);

  constructor(
    private readonly budgetStatusTransitionRepository: BudgetStatusTransitionRepository,
    private readonly budgetService: BudgetService,
  ) {}

  async findOneByOptions(options: FindOptions<BudgetStatusTransition>, queryRunner?: QueryRunner): Promise<BudgetStatusTransition> {
    try {
      //this.logger.log(`Finding budget status transition with options: ${JSON.stringify(options)}`);
      const budgetStatusTransition = await this.budgetStatusTransitionRepository.findOneByOptions(options, queryRunner);
      //this.logger.log(`Found budget status transition: ${JSON.stringify(budgetStatusTransition)}`);
      return budgetStatusTransition;
    } catch (error) {
      throw new NotFoundErrorException(BudgetStatusTransition.name, error);
    }
  }

  async findTransitions(budgetId: number): Promise<BudgetStatusTransition[]> {
    const budget = await this.budgetService.findById(budgetId);
    //this.logger.log(`Finding transitions for budget: ${JSON.stringify(budget.code)}`);
    return await this.budgetStatusTransitionRepository.findAllByOptions({ fromStatusId: budget.statusId });
  }

  async findAll(): Promise<BudgetStatusTransition[]> {
    return this.budgetStatusTransitionRepository.findAllByOptions();
  }

  async update(id: number, dto: Partial<BudgetStatusTransition>): Promise<BudgetStatusTransition> {
    //this.logger.log(`Updating budget status transition with id: ${id}`);
    await this.findOneByOptions({ id });
    const updatedBudgetStatusTransition = await this.budgetStatusTransitionRepository.save({ id, ...dto });
    return updatedBudgetStatusTransition;
  }
}
