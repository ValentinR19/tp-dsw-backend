import { BudgetBilling } from '@budgets-module/models/classes/budget-billing.entity';
import { CreateBudgetBillingDto } from '@budgets-module/models/dto/create-budget-billing.dto';
import { BudgetBillingRepository } from '@budgets-module/repository/budget-billing.repository';
import { Injectable } from '@nestjs/common';
import { NotSavedErrorException } from '@shared-module/exceptions/not-saved.exception';
import { QueryRunner } from 'typeorm';

@Injectable()
export class BudgetBillingService {
  constructor(private readonly budgetBillingRepository: BudgetBillingRepository) {}

  async save(billing: Partial<BudgetBilling>, queryRunner?: QueryRunner): Promise<BudgetBilling> {
    try {
      return this.budgetBillingRepository.save(billing, queryRunner);
    } catch (error) {
      throw new NotSavedErrorException(BudgetBilling.name, error);
    }
  }

  async create(dto: CreateBudgetBillingDto, queryRunner?: QueryRunner): Promise<BudgetBilling> {
    return this.save(dto, queryRunner);
  }
}
