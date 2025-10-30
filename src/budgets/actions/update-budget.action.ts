import { Budget } from '@budgets-module/models/classes/budget.entity';
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
      this.logger.log(`Updating budget ID ${id} with data: ${JSON.stringify(dto)}`);

      await this.budgetService.findById(id, queryRunner);

      await this.budgetService.save(
        {
          id,
          ...dto,
        },
        queryRunner,
      );

      if (dto.items) {
        await this.budgetItemService.deleteByBudgetId(id, queryRunner);

        const newItems = dto.items.map((item) => ({
          ...item,
          budgetId: id,
        }));
        await this.budgetItemService.save(newItems, queryRunner);
      }

      if (dto.budgetShipping) {
        const existingShipping = await this.budgetShippingService.findByBudgetId(id, queryRunner);
        if (existingShipping) {
          await this.budgetShippingService.save({ id: existingShipping.id, ...dto.budgetShipping }, queryRunner);
        } else {
          await this.budgetShippingService.create({ ...dto.budgetShipping, budgetId: id }, queryRunner);
        }
      }

      // 🧾 4. Actualizar facturación
      if (dto.budgetBilling) {
        const existingBilling = await this.budgetBillingService.findByBudgetId(id, queryRunner);
        if (existingBilling) {
          await this.budgetBillingService.save({ id: existingBilling.id, ...dto.budgetBilling }, queryRunner);
        } else {
          await this.budgetBillingService.create({ ...dto.budgetBilling, budgetId: id }, queryRunner);
        }
      }

      await queryRunner.commitTransaction();

      // 🔄 Devuelve con relaciones actualizadas
      return this.budgetService.findById(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
