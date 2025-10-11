import { CreateBudgetAction } from '@budgets-module/actions/create-budget.action';
import { BudgetController } from '@budgets-module/controllers/budget.controller';
import { BudgetBilling } from '@budgets-module/models/classes/budget-billing.entity';
import { BudgetItem } from '@budgets-module/models/classes/budget-item.entity';
import { BudgetShipping } from '@budgets-module/models/classes/budget-shipping.entity';
import { BudgetStatusHistory } from '@budgets-module/models/classes/budget-status-history.entity';
import { BudgetStatus } from '@budgets-module/models/classes/budget-status.entity';
import { Budget } from '@budgets-module/models/classes/budget.entity';
import { BudgetBillingRepository } from '@budgets-module/repository/budget-billing.repository';
import { BudgetItemRepository } from '@budgets-module/repository/budget-item.repository';
import { BudgetShippingRepository } from '@budgets-module/repository/budget-shipping.repository';
import { BudgetRepository } from '@budgets-module/repository/budget.repository';
import { BudgetBillingService } from '@budgets-module/services/budget-billing.service';
import { BudgetItemService } from '@budgets-module/services/budget-item.service';
import { BudgetShippingService } from '@budgets-module/services/budget-shipping.service';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, BudgetItem, BudgetStatus, BudgetStatusHistory, BudgetShipping, BudgetBilling])],
  controllers: [BudgetController],
  providers: [
    BudgetService,
    BudgetRepository,
    BudgetItemService,
    BudgetItemRepository,
    BudgetShippingService,
    BudgetShippingRepository,
    BudgetBillingService,
    BudgetBillingRepository,
    CreateBudgetAction,
  ],
})
export class BudgetModule {}
