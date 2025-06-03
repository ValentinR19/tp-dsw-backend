import { BudgetController } from '@budgets-module/controllers/budget.controller';
import { Budget } from '@budgets-module/models/entities/budget.entity';
import { BudgetService } from '@budgets-module/services/budgets.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Budget])],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
