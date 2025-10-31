import { CreateBudgetAction } from '@budgets-module/actions/create-budget.action';
import { BudgetPdfController } from '@budgets-module/controllers/budget-pdf.controller';
import { BudgetStatusTransitionController } from '@budgets-module/controllers/budget-status-transition.controller';
import { BudgetController } from '@budgets-module/controllers/budget.controller';
import { ChangeStatusBudgetController } from '@budgets-module/controllers/change-status-budget.controller';
import { BudgetBilling } from '@budgets-module/models/classes/budget-billing.entity';
import { BudgetItem } from '@budgets-module/models/classes/budget-item.entity';
import { BudgetShipping } from '@budgets-module/models/classes/budget-shipping.entity';
import { BudgetStatusHistory } from '@budgets-module/models/classes/budget-status-history.entity';
import { BudgetStatusTransition } from '@budgets-module/models/classes/budget-status-transition.entity';
import { BudgetStatus } from '@budgets-module/models/classes/budget-status.entity';
import { Budget } from '@budgets-module/models/classes/budget.entity';
import { BudgetBillingRepository } from '@budgets-module/repository/budget-billing.repository';
import { BudgetItemRepository } from '@budgets-module/repository/budget-item.repository';
import { BudgetShippingRepository } from '@budgets-module/repository/budget-shipping.repository';
import { BudgetStatusHistoryRepository } from '@budgets-module/repository/budget-status-history.repository';
import { BudgetStatusTransitionRepository } from '@budgets-module/repository/budget-status-transition.repository';
import { BudgetRepository } from '@budgets-module/repository/budget.repository';
import { BudgetBillingService } from '@budgets-module/services/budget-billing.service';
import { BudgetChangeStatusService } from '@budgets-module/services/budget-change-status.service';
import { BudgetItemService } from '@budgets-module/services/budget-item.service';
import { BudgetPdfService } from '@budgets-module/services/budget-pdf.service';
import { BudgetShippingService } from '@budgets-module/services/budget-shipping.service';
import { BudgetStatusHistoryService } from '@budgets-module/services/budget-status-history.service';
import { BudgetStatusTransitionService } from '@budgets-module/services/budget-status-transition.service';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { CustomerModule } from '@customers-module/customers.module';
import { PdfModule } from '@main-module/pdf/pdf.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateBudgetAction } from './actions/update-budget.action';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, BudgetItem, BudgetStatus, BudgetStatusHistory, BudgetShipping, BudgetBilling, BudgetStatusTransition]), PdfModule, CustomerModule],
  controllers: [BudgetController, BudgetPdfController, BudgetStatusTransitionController, ChangeStatusBudgetController],
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
    UpdateBudgetAction,
    BudgetPdfService,
    BudgetStatusTransitionService,
    BudgetStatusTransitionRepository,
    BudgetChangeStatusService,
    BudgetStatusHistoryService,
    BudgetStatusHistoryRepository,
  ],
})
export class BudgetModule {}
