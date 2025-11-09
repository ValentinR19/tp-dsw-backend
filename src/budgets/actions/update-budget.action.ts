import { Budget } from '@budgets-module/models/classes/budget.entity';
import { BudgetShipping } from '@budgets-module/models/classes/budget-shipping.entity';
import { UpdateBudgetDto } from '@budgets-module/models/dto/update-budget.dto';
import { BudgetBillingService } from '@budgets-module/services/budget-billing.service';
import { BudgetItemService } from '@budgets-module/services/budget-item.service';
import { BudgetShippingService } from '@budgets-module/services/budget-shipping.service';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateBudgetAction {
  private logger = new Logger(UpdateBudgetAction.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly budgetService: BudgetService,
    private readonly budgetItemService: BudgetItemService,
    private readonly budgetShippingService: BudgetShippingService,
    private readonly budgetBillingService: BudgetBillingService,
  ) {}

  async execute(id: number, dto: UpdateBudgetDto): Promise<Budget> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { items, budgetShipping, budgetBilling, ...budget } = dto;

      await this.budgetService.findById(id, queryRunner);
      await this.budgetService.save({ id, ...budget }, queryRunner);

      if (items) {
        await this.budgetItemService.deleteByBudgetId(id, queryRunner);
        const newItems = items.map((item) => ({
          ...item,
          budgetId: id,
        }));
        await this.budgetItemService.save(newItems, queryRunner);
      }

      if (budgetShipping) {
        const existingShipping = await this.budgetShippingService.findByBudgetId(id, queryRunner);
        // Preparar datos eliminando propiedades undefined
        const shippingData: Partial<BudgetShipping> = {
          address: budgetShipping.address,
          email: budgetShipping.email,
          countryId: budgetShipping.countryId || undefined,
          stateId: budgetShipping.stateId || undefined,
          cityId: budgetShipping.cityId || undefined,
        };

        // Remover campos undefined
        Object.keys(shippingData).forEach((key) => {
          if (shippingData[key] === undefined) {
            delete shippingData[key];
          }
        });

        if (existingShipping) {
          await this.budgetShippingService.save({ id: existingShipping.id, ...shippingData }, queryRunner);
        } else {
          await this.budgetShippingService.create(
            { ...shippingData, budgetId: id } as any, // Usar 'as any' temporalmente
            queryRunner,
          );
        }
      }

      if (budgetBilling) {
        const existingBilling = await this.budgetBillingService.findByBudgetId(id, queryRunner);
        if (existingBilling) {
          await this.budgetBillingService.save({ id: existingBilling.id, ...budgetBilling }, queryRunner);
        } else {
          await this.budgetBillingService.create({ ...budgetBilling, budgetId: id } as any, queryRunner);
        }
      }

      await queryRunner.commitTransaction();
      return this.budgetService.findById(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
