import { BudgetStatusTransition } from '@budgets-module/models/classes/budget-status-transition.entity';
import { BudgetStatusTransitionService } from '@budgets-module/services/budget-status-transition.service';
import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';

@Controller('status-transitions')
@UseGuards(JwtAuthGuard)
export class BudgetStatusTransitionController {
  constructor(private readonly budgetStatusTransitionService: BudgetStatusTransitionService) {}

  @Get('all')
  async findAll(): Promise<BudgetStatusTransition[]> {
    return await this.budgetStatusTransitionService.findAll();
  }

  @Get(':budgetId')
  async getStatusTransition(@Param('budgetId', ParseIntPipe) budgetId: number): Promise<BudgetStatusTransition[]> {
    return await this.budgetStatusTransitionService.findTransitions(budgetId);
  }
}
