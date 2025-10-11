import { BudgetShipping } from '@budgets-module/models/classes/budget-shipping.entity';
import { CreateBudgetShippingDto } from '@budgets-module/models/dto/create-budget-shipping.dto';
import { BudgetShippingRepository } from '@budgets-module/repository/budget-shipping.repository';
import { Injectable } from '@nestjs/common';
import { NotSavedErrorException } from '@shared-module/exceptions/not-saved.exception';
import { QueryRunner } from 'typeorm';

@Injectable()
export class BudgetShippingService {
  constructor(private readonly budgetShippingRepository: BudgetShippingRepository) {}

  async save(shipping: Partial<BudgetShipping>, queryRunner?: QueryRunner): Promise<BudgetShipping> {
    try {
      return this.budgetShippingRepository.save(shipping, queryRunner);
    } catch (error) {
      throw new NotSavedErrorException(BudgetShipping.name, error);
    }
  }

  async create(dto: CreateBudgetShippingDto, queryRunner?: QueryRunner): Promise<BudgetShipping> {
    return this.save(dto, queryRunner);
  }
}
