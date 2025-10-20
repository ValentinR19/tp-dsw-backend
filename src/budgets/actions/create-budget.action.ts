import { BudgetItem } from '@budgets-module/models/classes/budget-item.entity';
import { Budget } from '@budgets-module/models/classes/budget.entity';
import { CreateBudgetDto } from '@budgets-module/models/dto/create-budget.dto';
import { BudgetBillingService } from '@budgets-module/services/budget-billing.service';
import { BudgetItemService } from '@budgets-module/services/budget-item.service';
import { BudgetShippingService } from '@budgets-module/services/budget-shipping.service';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { IUserPayload } from '@main-module/auth/models/interfaces/payload.interface';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '@shared-module/interfaces/use-case.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateBudgetAction implements IUseCase<{ dto: CreateBudgetDto; user: IUserPayload }, Budget> {
  private logger = new Logger(CreateBudgetAction.name);

  constructor(
    private readonly budgetService: BudgetService,
    private readonly budgetItemService: BudgetItemService,
    private readonly budgetShippingService: BudgetShippingService,
    private readonly budgetBillingService: BudgetBillingService,
    private readonly dataSource: DataSource,
  ) {}

  async execute({ dto, user }: { dto: CreateBudgetDto; user: IUserPayload }): Promise<Budget> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this.logger.log(`Creating budget: ${JSON.stringify(dto)}`);

      const budgetPayload: Partial<Budget> = {
        customerId: dto.customerId,
        sellerId: user.id,
        currencyId: dto.currencyId,
        subtotal: dto.subtotal,
        totalDiscount: dto.totalDiscount,
        totalTax: dto.totalTax,
        total: dto.total,
      };
      const budget = await this.budgetService.save(budgetPayload, queryRunner);
      budget.code = `BUD-${budget.id.toString().padStart(5, '0')}`;
      await this.budgetService.save({ id: budget.id, code: budget.code }, queryRunner);
      let itemsPayload: BudgetItem[] = [];
      if (dto.items && dto.items.length > 0) {
        for (const dtoItem of dto.items) {
          itemsPayload.push({
            budgetId: budget.id,
            ...dtoItem,
          } as BudgetItem);
        }
        await this.budgetItemService.save(itemsPayload, queryRunner);
      }

      dto.budgetShipping && (await this.budgetShippingService.create({ ...dto.budgetShipping, budgetId: budget.id }, queryRunner));

      dto.budgetBilling && (await this.budgetBillingService.create({ ...dto.budgetBilling, budgetId: budget.id }, queryRunner));

      await queryRunner.commitTransaction();
      return budget;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
