import { BudgetController } from '@budgets-module/controllers/budget.controller';
import { BudgetItem } from '@budgets-module/models/classes/budget-item.entity';
import { BudgetStatusHistory } from '@budgets-module/models/classes/budget-status-history.entity';
import { BudgetStatus } from '@budgets-module/models/classes/budget-status.entity';
import { Budget } from '@budgets-module/models/classes/budget.entity';
import { BudgetRepository } from '@budgets-module/repository/budget.repository';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, BudgetItem, BudgetStatus, BudgetStatusHistory])],
  controllers: [BudgetController],
  providers: [BudgetService, BudgetRepository],
})
export class BudgetModule {}
